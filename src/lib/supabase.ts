
import { createClient } from '@supabase/supabase-js';

// Use the provided credentials
const supabaseUrl = 'https://qioxddkbyetflxmdghmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3hkZGtieWV0Zmx4bWRnaG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzU3NjIsImV4cCI6MjA1NjE1MTc2Mn0.njPacJDLKGMKqtHRmpW5V5rC_x-k23P6NRR0LKLDz5o';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
