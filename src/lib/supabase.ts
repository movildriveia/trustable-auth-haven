
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

// Sign-up function with simplified profile handling
export async function signUpWithEmail(email: string, password: string, metadata: any = {}) {
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
