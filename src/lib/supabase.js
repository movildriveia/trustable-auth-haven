import { createClient } from '@supabase/supabase-js';

// Usamos las credenciales proporcionadas
const supabaseUrl = 'https://qioxddkbyetflxmdghmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3hkZGtieWV0Zmx4bWRnaG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzU3NjIsImV4cCI6MjA1NjE1MTc2Mn0.njPacJDLKGMKqtHRmpW5V5rC_x-k23P6NRR0LKLDz5o';

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función de inicio de sesión
export async function signInWithEmail(email, password) {
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
