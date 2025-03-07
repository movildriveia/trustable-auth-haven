
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useDashboard } from "@/lib/dashboard";

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  company_description?: string;
  company_website?: string;
  doc_count?: number;
  created_at?: string;
  updated_at?: string;
}

const ProfileSection = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { getUserProfile, updateUserProfile } = useDashboard();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    
    try {
      console.log("Iniciando carga de perfil...");
      const { profile, error } = await getUserProfile();
      
      if (error) {
        console.error("Error al cargar perfil:", error);
        toast.error(`Error al cargar perfil: ${error.message}`);
      } else if (profile) {
        console.log("Perfil cargado exitosamente:", profile);
        setProfile(profile);
      } else {
        console.error("No se encontró perfil");
        toast.error("No se encontró información de perfil");
      }
    } catch (err: any) {
      console.error("Error inesperado:", err);
      toast.error(`Ocurrió un error inesperado: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;
    
    setSaving(true);
    
    try {
      console.log("Iniciando actualización de perfil con datos:", {
        first_name: profile.first_name,
        last_name: profile.last_name,
        company_name: profile.company_name,
        company_description: profile.company_description,
        company_website: profile.company_website,
      });
      
      const { success, error } = await updateUserProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        company_name: profile.company_name,
        company_description: profile.company_description,
        company_website: profile.company_website,
      });
      
      if (error) {
        console.error("Error al actualizar perfil:", error);
        toast.error(`Error al actualizar perfil: ${error.message}`);
      } else if (success) {
        console.log("Perfil actualizado correctamente");
        toast.success("Perfil actualizado correctamente");
      }
    } catch (err: any) {
      console.error("Error inesperado:", err);
      toast.error(`Ocurrió un error inesperado: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-custom-dark mb-6">Perfil</h2>
        <div className="text-center py-6">Cargando información del perfil...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-custom-dark mb-6">Información de Perfil</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first_name">Nombre</Label>
            <Input
              id="first_name"
              name="first_name"
              value={profile?.first_name || ""}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last_name">Apellido</Label>
            <Input
              id="last_name"
              name="last_name"
              value={profile?.last_name || ""}
              onChange={handleChange}
              placeholder="Apellido"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company_name">Nombre de Empresa</Label>
          <Input
            id="company_name"
            name="company_name"
            value={profile?.company_name || ""}
            onChange={handleChange}
            placeholder="Nombre de Empresa"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company_description">Descripción de Empresa</Label>
          <textarea
            id="company_description"
            name="company_description"
            value={profile?.company_description || ""}
            onChange={handleChange}
            placeholder="Breve descripción de tu empresa"
            className="w-full h-24 px-3 py-2 text-base text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company_website">Sitio Web de Empresa</Label>
          <Input
            id="company_website"
            name="company_website"
            type="url"
            value={profile?.company_website || ""}
            onChange={handleChange}
            placeholder="https://ejemplo.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            name="email"
            value={profile?.email || ""}
            disabled
            readOnly
            className="bg-gray-100"
          />
          <p className="text-xs text-gray-500">El correo electrónico no se puede cambiar</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="doc_count">Número de Documentos</Label>
          <Input
            id="doc_count"
            name="doc_count"
            value={profile?.doc_count || 0}
            disabled
            readOnly
            className="bg-gray-100"
          />
          <p className="text-xs text-gray-500">Este valor se actualiza automáticamente</p>
        </div>
        
        <div className="pt-4">
          <Button type="submit" variant="registerBtn" disabled={saving}>
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;
