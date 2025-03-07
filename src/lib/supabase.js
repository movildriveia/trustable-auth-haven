import { createClient } from '@supabase/supabase-js';

// Use the provided credentials
const supabaseUrl = 'https://qioxddkbyetflxmdghmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3hkZGtieWV0Zmx4bWRnaG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzU3NjIsImV4cCI6MjA1NjE1MTc2Mn0.njPacJDLKGMKqtHRmpW5V5rC_x-k23P6NRR0LKLDz5o';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign-in function with email verification check
export async function signInWithEmail(email, password) {
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

// Sign-up function with manual profile creation
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
    
    // Manual profile creation
    if (data.user) {
      try {
        const { error: profileError } = await supabase
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
        
        if (profileError) {
          console.error("Error creating profile:", profileError);
          // Continue anyway since the user is created
          console.log("User created, but profile creation failed");
        } else {
          console.log("Profile created successfully");
        }
      } catch (profileErr) {
        console.error("Profile creation exception:", profileErr);
        // Continue anyway since the user is created
      }
    }
    
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error during signup:", err);
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

// Profile management functions

// Get current user's profile
export async function getCurrentProfile() {
  try {
    const { data: { user } } = await getUser();
    
    if (!user) return { data: null, error: new Error('No user logged in') };
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    return { data, error };
  } catch (err) {
    console.error("Error fetching profile:", err);
    return { data: null, error: err };
  }
}

// Update profile
export async function updateProfile(updates) {
  try {
    const { data: { user } } = await getUser();
    
    if (!user) return { data: null, error: new Error('No user logged in') };
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select();
      
    return { data, error };
  } catch (err) {
    console.error("Error updating profile:", err);
    return { data: null, error: err };
  }
}

// Create profile if it doesn't exist
export async function createProfileIfNeeded(userId, userData) {
  try {
    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking profile:", checkError);
      return { data: null, error: checkError };
    }
    
    // If profile exists, no need to create
    if (existingProfile) {
      console.log("Profile already exists:", existingProfile.id);
      return { data: existingProfile, error: null };
    }
    
    // Create new profile
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        { 
          id: userId, 
          ...userData,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
      .select();
    
    if (error) {
      console.error("Error creating profile:", error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error handling profile:", err);
    return { data: null, error: err };
  }
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
