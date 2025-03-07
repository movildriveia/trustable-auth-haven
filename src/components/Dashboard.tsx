
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import DashboardLayout from "./dashboard/DashboardLayout";
import DocumentsSection from "./dashboard/DocumentsSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, Clock, Key, LogOut } from "lucide-react";
import { useDashboard } from "@/lib/dashboard";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { getUserProfile } = useDashboard();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        navigate("/login");
      } else {
        loadUserProfile();
      }
    };
    
    checkAuth();
  }, [navigate, isAuthenticated]);

  const loadUserProfile = async () => {
    setLoading(true);
    const { profile, error } = await getUserProfile();
    if (profile) {
      setProfile(profile);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/dashboard/profile");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-6 text-custom-dark">Panel de Control</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Cerrar Sesión
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Área Segura</h2>
                <p className="text-sm text-gray-500">Esta página solo es accesible para usuarios autenticados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Perfil de Usuario */}
          <Card>
            <CardHeader>
              <CardTitle>Perfil de Usuario</CardTitle>
              <CardDescription>Información de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
              </div>
              
              {loading ? (
                <p>Cargando información...</p>
              ) : profile ? (
                <div className="space-y-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nombre:</h3>
                    <p>{profile.first_name} {profile.last_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email:</h3>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Miembro desde:</h3>
                    <p>{profile.created_at ? format(new Date(profile.created_at), 'dd/MM/yyyy', { locale: es }) : 'N/A'}</p>
                  </div>
                </div>
              ) : (
                <p>No se pudo cargar la información del perfil</p>
              )}
              
              <div className="mt-6">
                <Button onClick={handleEditProfile} className="w-full">Editar Perfil</Button>
              </div>
            </CardContent>
          </Card>

          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2 pb-2 border-b">
                  <Clock className="h-4 w-4 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Inicio de sesión</h3>
                    <p className="text-sm text-gray-500">Hace 5 minutos</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 pb-2 border-b">
                  <User className="h-4 w-4 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Actualización de perfil</h3>
                    <p className="text-sm text-gray-500">Ayer</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Key className="h-4 w-4 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Cambio de contraseña</h3>
                    <p className="text-sm text-gray-500">Hace 3 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ajustes de Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle>Ajustes de Seguridad</CardTitle>
              <CardDescription>Gestiona las opciones de seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="h-4 w-4" />
                Activar autenticación de dos factores
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Key className="h-4 w-4" />
                Cambiar contraseña
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="h-4 w-4" />
                Revisar dispositivos conectados
              </Button>
            </CardContent>
          </Card>
        </div>

        <DocumentsSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
