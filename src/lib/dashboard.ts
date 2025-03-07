
import { toast } from "sonner";
import { supabase } from "./supabase";

// Interfaz para el perfil de usuario
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

// Interfaz para documentos
export interface Document {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  user_id: string;
}

// Funciones para el dashboard
export const useDashboard = () => {
  // Obtener el perfil del usuario actual
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
  
  // Actualizar el perfil del usuario
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
  
  // Obtener documentos del usuario
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
      
      return { documents: data as Document[], error: null };
    } catch (err: any) {
      console.error("Unexpected error:", err);
      return { documents: null, error: err };
    }
  };
  
  // Subir un documento
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
      
      // Validar tipo de archivo si es necesario
      // if (file.type !== 'application/pdf') {
      //   return { success: false, error: new Error("Only PDF files are allowed") };
      // }
      
      // Nombre único para el archivo
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${session.user.id}/${fileName}`;
      
      // Subir archivo a Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
      
      if (uploadError) {
        toast.error(`Upload failed: ${uploadError.message}`);
        return { success: false, error: uploadError };
      }
      
      // Obtener URL pública
      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
      
      // Guardar metadatos en la base de datos
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
  
  // Eliminar un documento
  const deleteDocument = async (id: string): Promise<{
    success: boolean;
    error: Error | null;
  }> => {
    try {
      // Primero obtener el documento para encontrar la ruta del archivo
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
      
      // Extraer el nombre del archivo de la URL para obtener la ruta de almacenamiento
      if (document && document.file_path) {
        const urlParts = document.file_path.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        if (fileName) {
          const storagePath = `${session.user.id}/${fileName}`;
          
          // Intentar eliminar el archivo del almacenamiento
          const { error: storageError } = await supabase.storage
            .from('documents')
            .remove([storagePath]);
          
          if (storageError) {
            console.warn('Error deleting file from storage:', storageError);
            // Continuar con la eliminación de la base de datos incluso si falla
          }
        }
      }
      
      // Eliminar de la base de datos
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error(`Failed to delete document: ${error.message}`);
        return { success: false, error };
      }
      
      toast.success("Document deleted successfully");
      return { success: true, error: null };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Formatear tamaño de archivo
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
    formatFileSize
  };
};
