
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

// Función para actualizar los metadatos del usuario
export async function updateUserMetadata(metadata) {
  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  });
  return { data, error };
}

// Función para crear un registro en una tabla específica
export async function createRecord(table, data) {
  const { data: record, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  return { data: record, error };
}

// Función para obtener registros de una tabla
export async function getRecords(table, query = {}) {
  let request = supabase.from(table).select('*');
  
  if (query.filters) {
    for (const filter of query.filters) {
      request = request.filter(filter.column, filter.operator, filter.value);
    }
  }
  
  if (query.limit) {
    request = request.limit(query.limit);
  }
  
  if (query.orderBy) {
    request = request.order(query.orderBy.column, { ascending: query.orderBy.ascending });
  }
  
  const { data, error } = await request;
  return { data, error };
}

// Función para actualizar un registro
export async function updateRecord(table, id, data) {
  const { data: record, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select();
  return { data: record, error };
}

// Función para eliminar un registro
export async function deleteRecord(table, id) {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  return { data, error };
}
