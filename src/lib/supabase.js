
import { createClient } from '@supabase/supabase-js';

// Use the provided credentials
const supabaseUrl = 'https://qioxddkbyetflxmdghmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3hkZGtieWV0Zmx4bWRnaG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzU3NjIsImV4cCI6MjA1NjE1MTc2Mn0.njPacJDLKGMKqtHRmpW5V5rC_x-k23P6NRR0LKLDz5o';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign-in function with email verification check
export async function signInWithEmail(email, password) {
  try {
    // First, get user data to check if email is confirmed
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError && userError.message !== 'Invalid JWT') {
      console.error("Error checking user:", userError);
      return { data: null, error: userError };
    }
    
    // Try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // If sign in was successful but email is not confirmed
    if (data?.user && !data.user.email_confirmed_at) {
      console.log("Login rejected: Email not confirmed");
      return { 
        data: null, 
        error: { message: "Email not confirmed" } 
      };
    }
    
    return { data, error };
  } catch (err) {
    console.error("Sign in error:", err);
    return { data: null, error: err };
  }
}

// Sign-up function with email confirmation
export async function signUpWithEmail(email, password, metadata = {}) {
  try {
    console.log("Starting signup process with:", { email, metadata });
    
    // Try the sign up process
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
    
    console.log("Signup response:", data);
    
    // Check if profile was created by the trigger
    if (data.user) {
      // Wait a moment for the trigger to execute
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single();
      
      if (profileError || !profile) {
        console.log("Profile not found, creating manually");
        
        // Create profile manually if not created by trigger
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              email: email,
              full_name: metadata.full_name || '',
              created_at: new Date(),
              updated_at: new Date()
            }
          ]);
        
        if (insertError) {
          console.error("Error creating profile:", insertError);
          return { data, error: insertError };
        }
      } else {
        console.log("Profile already created by trigger:", profile.id);
      }
    }
    
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error during signup:", err);
    return { data: null, error: err };
  }
}

// Función para cerrar sesión
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Función para obtener el usuario actual
export function getUser() {
  return supabase.auth.getUser();
}

// Función para obtener la sesión actual
export function getSession() {
  return supabase.auth.getSession();
}

// Funciones para gestionar perfiles

// Obtener perfil del usuario actual
export async function getCurrentProfile() {
  const { data: { user } } = await getUser();
  
  if (!user) return { data: null, error: new Error('No user logged in') };
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return { data, error };
}

// Actualizar perfil
export async function updateProfile(updates) {
  const { data: { user } } = await getUser();
  
  if (!user) return { data: null, error: new Error('No user logged in') };
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select();
    
  return { data, error };
}

// Update company profile information
export async function updateCompanyProfile(companyInfo) {
  const { data: { user } } = await getUser();
  
  if (!user) return { data: null, error: new Error('No user logged in') };
  
  const updates = {
    ...companyInfo,
    is_company: true,
    updated_at: new Date()
  };
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select();
    
  return { data, error };
}

// Verificar si el email está confirmado
export async function isEmailConfirmed() {
  const { data: { user } } = await getUser();
  return user?.email_confirmed_at ? true : false;
}

// Document management functions
export async function getDocuments() {
  const { data: { user } } = await getUser();
  
  if (!user) return { data: null, error: new Error('No user logged in') };
  
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
    
  return { data, error };
}

export async function getDocument(id) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();
    
  return { data, error };
}

export async function createDocument(documentData) {
  const { data: { user } } = await getUser();
  
  if (!user) return { data: null, error: new Error('No user logged in') };
  
  const { data, error } = await supabase
    .from('documents')
    .insert([
      { 
        ...documentData, 
        user_id: user.id 
      }
    ])
    .select();
    
  return { data, error };
}

export async function updateDocument(id, updates) {
  const { data, error } = await supabase
    .from('documents')
    .update(updates)
    .eq('id', id)
    .select();
    
  return { data, error };
}

export async function deleteDocument(id) {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);
    
  return { error };
}

// Check if user has reached document limit (max 10 documents)
export async function checkDocumentLimit() {
  const { data, error } = await getDocuments();
  
  if (error) return { limitReached: false, error };
  
  return { 
    limitReached: data && data.length >= 10,
    currentCount: data ? data.length : 0,
    error: null
  };
}

// Document permissions management
export async function shareDocument(documentId, userId, permissionLevel = 'read') {
  const { data, error } = await supabase
    .from('document_permissions')
    .insert([
      { 
        document_id: documentId,
        user_id: userId,
        permission_level: permissionLevel
      }
    ])
    .select();
    
  return { data, error };
}

export async function getSharedDocuments() {
  const { data: { user } } = await getUser();
  
  if (!user) return { data: null, error: new Error('No user logged in') };
  
  const { data, error } = await supabase
    .from('document_permissions')
    .select(`
      id,
      permission_level,
      documents (*)
    `)
    .eq('user_id', user.id);
    
  return { data, error };
}

// Storage functions
export async function uploadFile(bucket, path, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  return { data, error };
}

// Upload a document file and create a document record
export async function uploadDocument(file, documentInfo) {
  const { data: { user } } = await getUser();
  
  if (!user) return { data: null, error: new Error('No user logged in') };
  
  // Check file type
  const fileExt = file.name.split('.').pop().toLowerCase();
  const allowedTypes = ['pdf', 'xlsx', 'xls', 'doc', 'docx', 'ppt', 'pptx'];
  
  if (!allowedTypes.includes(fileExt)) {
    return { 
      data: null, 
      error: new Error('File type not allowed. Allowed types: PDF, Excel, Word, PowerPoint') 
    };
  }
  
  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { 
      data: null, 
      error: new Error('File size exceeds the 10MB limit') 
    };
  }
  
  // Check document limit
  const { limitReached, error: limitError } = await checkDocumentLimit();
  if (limitError) return { data: null, error: limitError };
  if (limitReached) {
    return { 
      data: null, 
      error: new Error('You have reached the maximum limit of 10 documents') 
    };
  }
  
  // Upload file to storage
  const filePath = `documents/${user.id}/${Date.now()}_${file.name}`;
  const { data: fileData, error: fileError } = await uploadFile('documents', filePath, file);
  
  if (fileError) return { data: null, error: fileError };
  
  // Get file URL
  const fileUrl = await getFileUrl('documents', filePath);
  
  // Create document record
  const { data, error } = await createDocument({
    title: documentInfo.title || file.name,
    description: documentInfo.description || '',
    document_url: fileUrl,
    file_type: fileExt,
    file_size: file.size,
    file_name: file.name
  });
  
  return { data, error };
}

export async function getFileUrl(bucket, path) {
  const { data } = await supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
}

export async function deleteFile(bucket, path) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  return { error };
}

// Delete document and its file
export async function deleteDocumentWithFile(documentId) {
  // Get document to find file path
  const { data: document, error: getError } = await getDocument(documentId);
  
  if (getError) return { error: getError };
  if (!document) return { error: new Error('Document not found') };
  
  // Extract path from URL
  const url = document.document_url;
  if (url) {
    const pathMatch = url.match(/documents\/(.+)/);
    if (pathMatch && pathMatch[1]) {
      const filePath = pathMatch[1];
      // Delete file from storage
      await deleteFile('documents', filePath);
    }
  }
  
  // Delete document record
  const { error } = await deleteDocument(documentId);
  
  return { error };
}
