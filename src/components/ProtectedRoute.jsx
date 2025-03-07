
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(data.session);
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
        toast({
          title: "Error de autenticación",
          description: "No se pudo verificar tu sesión",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!session) {
    toast({
      title: "Acceso denegado",
      description: "Debes iniciar sesión para acceder a esta página",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
