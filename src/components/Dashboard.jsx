import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, ShieldCheck } from "lucide-react";
import { signOut, getUser } from "@/lib/supabase";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data, error } = await getUser();
        
        if (error) {
          throw error;
        }
        
        setUserData(data.user);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos del usuario",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [toast]);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto py-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>

      <div className="bg-brand-50 border border-brand-100 p-4 rounded-lg mb-8">
        <div className="flex items-center">
          <ShieldCheck className="h-8 w-8 text-brand-600 mr-3" />
          <div>
            <h2 className="text-lg font-medium">Área Segura</h2>
            <p className="text-sm text-muted-foreground">
              Esta página solo es accesible para usuarios autenticados
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de Usuario</CardTitle>
            <CardDescription>Información de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="h-24 w-24 rounded-full bg-brand-100 flex items-center justify-center">
                <User className="h-12 w-12 text-brand-600" />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Nombre:</span> {userData?.user_metadata?.full_name || "Usuario"}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Email:</span> {userData?.email}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Miembro desde:</span> {new Date(userData?.created_at).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Editar Perfil</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="text-sm font-medium">Inicio de sesión</div>
                <div className="text-xs text-muted-foreground">Hace 5 minutos</div>
              </div>
              <div className="border-b pb-2">
                <div className="text-sm font-medium">Actualización de perfil</div>
                <div className="text-xs text-muted-foreground">Ayer</div>
              </div>
              <div className="border-b pb-2">
                <div className="text-sm font-medium">Cambio de contraseña</div>
                <div className="text-xs text-muted-foreground">Hace 3 días</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ajustes de Seguridad</CardTitle>
            <CardDescription>Gestiona las opciones de seguridad de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Activar autenticación de dos factores
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Cambiar contraseña
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Revisar dispositivos conectados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
