import { createClient } from '@supabase/supabase-js';

// Usamos las credenciales proporcionadas
const supabaseUrl = 'https://qioxddkbyetflxmdghmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3hkZGtieWV0Zmx4bWRnaG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzU3NjIsImV4cCI6MjA1NjE1MTc2Mn0.njPacJDLKGMKqtHRmpW5V5rC_x-k23P6NRR0LKLDz5o';

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función de inicio de sesión
export async function signInWithEmail(email, password) {
  // First, check if the user exists and has verified their email
  const { data: usersList, error: usersError } = await supabase.auth.admin.listUsers({
    email,
  });

  if (usersError) {
    console.error("Error checking user:", usersError);
    return { data: null, error: usersError };
  }

  const user = usersList?.users?.[0];
  
  // If user exists but email is not confirmed, return custom error
  if (user && !user.email_confirmed_at) {
    return { 
      data: null, 
      error: { message: "Email not confirmed" } 
    };
  }

  // Proceed with login if email is confirmed or user doesn't exist (will return auth error)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

// Función de registro con confirmación de email
export async function signUpWithEmail(email, password, metadata = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });
  return { data, error };
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
