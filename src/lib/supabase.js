
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

// Función de registro
export async function signUpWithEmail(email, password, metadata = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
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
