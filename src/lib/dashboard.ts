
import { toast } from "sonner";
import { supabase } from "./supabase";

// Interface for user profile
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  doc_count?: number;
  google?: boolean;
  aws?: boolean;
  azure?: boolean;
}

// Interface for documents
export interface Document {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  user_id: string;
}

// Dashboard functions
export const useDashboard = () => {
  // Get current user profile
  const getUserProfile = async (): Promise<{
    profile: UserProfile | null;
    error: Error | null;
  }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return { profile: null, error: new Error("No active session") };
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return { profile: null, error };
      }
      
      return { profile: data as UserProfile, error: null };
    } catch (err: any) {
      console.error("Unexpected error:", err);
      return { profile: null, error: err };
    }
  };
  
  // Update user profile
  const updateUserProfile = async (profile: Partial<UserProfile>): Promise<{
    success: boolean;
    error: Error | null;
  }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return { success: false, error: new Error("No active session") };
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);
      
      if (error) {
        toast.error(`Failed to update profile: ${error.message}`);
        return { success: false, error };
      }
      
      toast.success("Profile updated successfully");
      return { success: true, error: null };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Get user documents
  const getUserDocuments = async (): Promise<{
    documents: Document[] | null;
    error: Error | null;
  }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return { documents: null, error: new Error("No active session") };
      }
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching documents:", error);
        return { documents: null, error };
      }
      
      // Update doc_count in profile if it doesn't match
      if (data) {
        const { profile } = await getUserProfile();
        if (profile && profile.doc_count !== data.length) {
          await updateUserProfile({ doc_count: data.length });
        }
      }
      
      return { documents: data as Document[], error: null };
    } catch (err: any) {
      console.error("Unexpected error:", err);
      return { documents: null, error: err };
    }
  };
  
  // Upload document
  const uploadDocument = async (file: File): Promise<{
    success: boolean;
    document?: Document;
    error: Error | null;
  }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return { success: false, error: new Error("No active session") };
      }
      
      // Unique filename
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${session.user.id}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
      
      if (uploadError) {
        toast.error(`Upload failed: ${uploadError.message}`);
        return { success: false, error: uploadError };
      }
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
      
      // Save metadata to database
      const { data: documentData, error: insertError } = await supabase
        .from('documents')
        .insert([
          {
            user_id: session.user.id,
            name: file.name,
            file_path: publicUrlData.publicUrl,
            file_type: file.type,
            file_size: file.size
          }
        ])
        .select()
        .single();
      
      if (insertError) {
        toast.error(`Failed to save document metadata: ${insertError.message}`);
        return { success: false, error: insertError };
      }
      
      // Update document count in profile
      const { profile } = await getUserProfile();
      if (profile) {
        const newCount = (profile.doc_count || 0) + 1;
        await updateUserProfile({ doc_count: newCount });
      }
      
      toast.success("Document uploaded successfully");
      return { 
        success: true, 
        document: documentData as Document, 
        error: null 
      };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Delete document
  const deleteDocument = async (id: string): Promise<{
    success: boolean;
    error: Error | null;
  }> => {
    try {
      // First get the document to find the file path
      const { data: document, error: fetchError } = await supabase
        .from('documents')
        .select('file_path')
        .eq('id', id)
        .single();
      
      if (fetchError) {
        return { success: false, error: fetchError };
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return { success: false, error: new Error("No active session") };
      }
      
      // Extract filename from URL to get storage path
      if (document && document.file_path) {
        const urlParts = document.file_path.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        if (fileName) {
          const storagePath = `${session.user.id}/${fileName}`;
          
          // Try to delete file from storage
          const { error: storageError } = await supabase.storage
            .from('documents')
            .remove([storagePath]);
          
          if (storageError) {
            console.warn('Error deleting file from storage:', storageError);
            // Continue with database deletion even if storage deletion fails
          }
        }
      }
      
      // Delete from database
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error(`Failed to delete document: ${error.message}`);
        return { success: false, error };
      }
      
      // Update document count in profile
      const { profile } = await getUserProfile();
      if (profile && profile.doc_count && profile.doc_count > 0) {
        await updateUserProfile({ doc_count: profile.doc_count - 1 });
      }
      
      toast.success("Document deleted successfully");
      return { success: true, error: null };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Update AI service settings
  const updateAISettings = async (settings: {
    google?: boolean;
    aws?: boolean;
    azure?: boolean;
  }): Promise<{
    success: boolean;
    error: Error | null;
  }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return { success: false, error: new Error("No active session") };
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);
      
      if (error) {
        toast.error(`Failed to update AI settings: ${error.message}`);
        return { success: false, error };
      }
      
      toast.success("AI settings updated successfully");
      return { success: true, error: null };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return {
    getUserProfile,
    updateUserProfile,
    getUserDocuments,
    uploadDocument,
    deleteDocument,
    updateAISettings,
    formatFileSize
  };
};
