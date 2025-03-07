import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase, signUpWithEmail, signInWithEmail, signOut, getUser, getSession } from "./supabase";

// Interfaz para los metadatos de usuario
export interface UserMetadata {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
}

// Función para comprobar si el usuario está autenticado
export const isAuthenticated = async (): Promise<boolean> => {
  const { data, error } = await getSession();
  return !!data.session;
};

// Hook personalizado para manejar la autenticación
export const useAuth = () => {
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await signInWithEmail(email, password);
      
      if (error) {
        // Check if this is an email verification error
        if (error.message.includes("Email not confirmed") || error.message.includes("email not confirmed")) {
          toast.error("Please verify your email before logging in");
          return { success: false, error: { message: "Email not confirmed" } };
        }
        
        toast.error(`Login error: ${error.message}`);
        return { success: false, error };
      }
      
      // Check if email is verified by querying the profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('email_verified')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        toast.error(`Profile error: ${profileError.message}`);
        return { success: false, error: profileError };
      }
      
      if (!profileData.email_verified) {
        // Sign out the user if email is not verified
        await signOut();
        toast.error("Please verify your email before logging in");
        return { success: false, error: { message: "Email not confirmed" } };
      }
      
      toast.success("Login successful!");
      navigate("/dashboard");
      return { success: true, data };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Función para registrar un nuevo usuario
  const register = async (
    email: string, 
    password: string, 
    metadata: UserMetadata
  ) => {
    try {
      const { data, error } = await signUpWithEmail(email, password, metadata);
      
      if (error) {
        toast.error(`Registration error: ${error.message}`);
        return { success: false, error };
      }
      
      toast.success("Registration successful! Please check your email to confirm your account.");
      navigate("/login");
      return { success: true, data };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Función para cerrar sesión
  const logout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        toast.error(`Logout error: ${error.message}`);
        return { success: false, error };
      }
      
      toast.success("Logged out successfully");
      navigate("/login");
      return { success: true };
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
      return { success: false, error: err };
    }
  };
  
  // Función para obtener el usuario actual
  const getCurrentUser = async () => {
    try {
      const { data, error } = await getUser();
      
      if (error) {
        return { user: null, error };
      }
      
      return { user: data.user, error: null };
    } catch (err) {
      return { user: null, error: err };
    }
  };
  
  // Función para obtener la sesión actual
  const getCurrentSession = async () => {
    try {
      const { data, error } = await getSession();
      
      if (error) {
        return { session: null, error };
      }
      
      return { session: data.session, error: null };
    } catch (err) {
      return { session: null, error: err };
    }
  };
  
  return {
    login,
    register,
    logout,
    getCurrentUser,
    getCurrentSession,
    isAuthenticated
  };
};

// Configurar un listener para los cambios en la autenticación
export const setupAuthListener = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};
