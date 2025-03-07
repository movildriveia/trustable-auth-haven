
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import DashboardLayout from "./dashboard/DashboardLayout";
import DocumentsSection from "./dashboard/DocumentsSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, Clock, Key, LogOut, LayoutDashboard } from "lucide-react";
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-custom-dark">Panel de Control</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 rounded-md border border-gray-300" 
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Cerrar Sesión
          </Button>
        </div>

        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-gray-800" />
              <div>
                <h2 className="text-lg font-semibold text-custom-dark">Área Segura</h2>
                <p className="text-gray-600">Esta página solo es accesible para usuarios autenticados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Perfil de Usuario */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-custom-dark">Perfil de Usuario</CardTitle>
              <CardDescription>Información de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
              </div>
              
              {loading ? (
                <p>Cargando información...</p>
              ) : profile ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nombre:</h3>
                    <p className="font-semibold">{profile.first_name} {profile.last_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email:</h3>
                    <p className="font-semibold">{profile.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Miembro desde:</h3>
                    <p className="font-semibold">{profile.created_at ? format(new Date(profile.created_at), 'dd/MM/yyyy', { locale: es }) : 'N/A'}</p>
                  </div>
                </div>
              ) : (
                <p>No se pudo cargar la información del perfil</p>
              )}
              
              <div className="mt-6">
                <Button 
                  onClick={handleEditProfile} 
                  variant="outline" 
                  className="w-full border border-gray-300"
                >
                  Editar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actividad Reciente */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-custom-dark">Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="py-3 border-b border-gray-200">
                  <h3 className="font-medium text-custom-dark">Inicio de sesión</h3>
                  <p className="text-sm text-gray-500">Hace 5 minutos</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <h3 className="font-medium text-custom-dark">Actualización de perfil</h3>
                  <p className="text-sm text-gray-500">Ayer</p>
                </div>
                <div className="py-3">
                  <h3 className="font-medium text-custom-dark">Cambio de contraseña</h3>
                  <p className="text-sm text-gray-500">Hace 3 días</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ajustes de Seguridad */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-custom-dark">Ajustes de Seguridad</CardTitle>
              <CardDescription>Gestiona las opciones de seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border border-gray-300 hover:bg-gray-50"
              >
                <Shield className="h-4 w-4" />
                Activar autenticación de dos factores
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border border-gray-300 hover:bg-gray-50"
              >
                <Key className="h-4 w-4" />
                Cambiar contraseña
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border border-gray-300 hover:bg-gray-50"
              >
                <LayoutDashboard className="h-4 w-4" />
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
