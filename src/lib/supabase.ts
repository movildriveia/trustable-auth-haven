import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types for user metadata and documents
export interface UserMetadata {
  // Basic user info
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  
  // Company related info
  company_name?: string;
  company_description?: string;
  company_website?: string;
  company_size?: string;
  company_industry?: string;
  
  // User preferences and settings
  is_company?: boolean;
  avatar_url?: string;
  phone_number?: string;
  job_title?: string;
  
  // Additional metadata
  timezone?: string;
  language_preference?: string;
  account_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Document {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  user_id: string;
}

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

// Use environment variables with fallbacks to the existing credentials
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || 'https://vlodrwaarjwhzjnrezcs.supabase.co';
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsb2Ryd2Fhcmp3aHpqbnJlemNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMDE1MTIsImV4cCI6MjA1Njg3NzUxMn0.CMtmJkw25zQ52UXQugpQgWO3JRs8dvM_A2m07qGRt5c';

// Create the Supabase client with additional configuration
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Log connection status for debugging
console.log('Supabase client initialized');

// Sign-up function with comprehensive profile handling
export async function signUpWithEmail(email: string, password: string, metadata: UserMetadata = {}) {
  try {
    console.log("Starting signup process with:", { email, metadata });
    
    // Try the sign up process without profile creation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    
    if (error) {
      console.error("Signup error from Supabase:", error);
      return { data: null, error };
    }
    
    console.log("Signup successful:", data);
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error during signup:", err);
    return { data: null, error: err };
  }
}

// Sign-in function
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Sign in error:", error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error("Sign in error:", err);
    return { data: null, error: err };
  }
}

// Function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Function to get current user
export function getUser() {
  return supabase.auth.getUser();
}

// Function to get current session
export function getSession() {
  return supabase.auth.getSession();
}

// Document Management Functions

// Get documents for the current user
export async function getUserDocuments() {
  try {
    const { data: sessionData, error: sessionError } = await getSession();
    
    if (sessionError || !sessionData.session) {
      return { documents: null, error: new Error("No active session") };
    }
    
    const userId = sessionData.session.user.id;
    
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching documents:", error);
      return { documents: null, error };
    }
    
    return { documents: data as Document[], error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { documents: null, error: err };
  }
}

// Upload a document
export async function uploadDocument(file: File) {
  try {
    const { data: sessionData, error: sessionError } = await getSession();
    
    if (sessionError || !sessionData.session) {
      return { success: false, error: new Error("No active session") };
    }
    
    const userId = sessionData.session.user.id;
    
    // Create a unique file name
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${userId}/${fileName}`;
    
    // Upload file to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);
    
    if (uploadError) {
      console.error("Upload failed:", uploadError);
      return { success: false, error: uploadError };
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);
    
    // Save document metadata to database
    const { data: documentData, error: insertError } = await supabase
      .from('documents')
      .insert([
        {
          user_id: userId,
          name: file.name,
          file_path: publicUrlData.publicUrl,
          file_type: file.type,
          file_size: file.size
        }
      ])
      .select()
      .single();
    
    if (insertError) {
      console.error("Failed to save document metadata:", insertError);
      return { success: false, error: insertError };
    }
    
    return { 
      success: true, 
      document: documentData as Document, 
      error: null 
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: err };
  }
}

// Delete a document
export async function deleteDocument(id: string) {
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
    
    const { data: sessionData, error: sessionError } = await getSession();
    if (sessionError || !sessionData.session) {
      return { success: false, error: new Error("No active session") };
    }
    
    const userId = sessionData.session.user.id;
    
    // Extract the file path from the URL to get the storage path
    if (document && document.file_path) {
      const urlParts = document.file_path.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName) {
        const storagePath = `${userId}/${fileName}`;
        
        // Try to delete the file from storage
        const { error: storageError } = await supabase.storage
          .from('documents')
          .remove([storagePath]);
        
        if (storageError) {
          console.warn('Error deleting file from storage:', storageError);
          // Continue with the database deletion even if storage deletion fails
        }
      }
    }
    
    // Delete from database
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    
    if (error) {
      return { success: false, error };
    }
    
    return { success: true, error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: err };
  }
}

// Profile Management Functions

// Get the current user's profile
export async function getUserProfile() {
  try {
    const { data: sessionData, error: sessionError } = await getSession();
    
    if (sessionError || !sessionData.session) {
      return { profile: null, error: new Error("No active session") };
    }
    
    const userId = sessionData.session.user.id;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error fetching profile:", error);
      return { profile: null, error };
    }
    
    return { profile: data as Profile, error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { profile: null, error: err };
  }
}

// Update the current user's profile
export async function updateUserProfile(profile: Partial<Profile>) {
  try {
    const { data: sessionData, error: sessionError } = await getSession();
    
    if (sessionError || !sessionData.session) {
      return { success: false, error: new Error("No active session") };
    }
    
    const userId = sessionData.session.user.id;
    
    const { error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (error) {
      console.error("Failed to update profile:", error);
      return { success: false, error };
    }
    
    return { success: true, error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: err };
  }
}

// Utility Functions

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Check if a file with the same name already exists for the user
export async function checkFileExists(fileName: string): Promise<boolean> {
  try {
    const { data: sessionData, error: sessionError } = await getSession();
    
    if (sessionError || !sessionData.session) {
      return false;
    }
    
    const userId = sessionData.session.user.id;
    
    const { data, error } = await supabase
      .from('documents')
      .select('id, name')
      .eq('user_id', userId)
      .eq('name', fileName);
    
    if (error) {
      console.error("Error checking file existence:", error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
}

// Set up auth state change listener
export function setupAuthListener(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}
