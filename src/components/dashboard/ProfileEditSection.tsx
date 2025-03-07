
import React, { useState, useEffect } from "react";
import { useDashboard, UserProfile } from "@/lib/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ProfileEditSection = () => {
  const { getUserProfile, updateUserProfile } = useDashboard();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: ""
  });

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const { profile, error } = await getUserProfile();
      
      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load user profile");
      } else if (profile) {
        setProfile(profile);
        setFormData({
          first_name: profile.first_name || "",
          last_name: profile.last_name || "",
          company_name: profile.company_name || ""
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { success, error } = await updateUserProfile(formData);
      
      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      } else if (success) {
        toast.success("Profile updated successfully");
        // Update the profile state
        setProfile(prev => {
          if (!prev) return null;
          return {
            ...prev,
            ...formData
          };
        });
        setShowEditProfile(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
    loadUserProfile(); // Refresh the profile data when editing
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-center">
            <p>Loading profile information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showEditProfile ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-custom-dark">Editar Perfil</h2>
            <Button 
              variant="outline" 
              onClick={() => setShowEditProfile(false)}
            >
              Cancelar
            </Button>
          </div>
          
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nombre</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last_name">Apellido</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_name">Nombre de la Empresa</Label>
              <Input
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                placeholder="Nombre de la Empresa"
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
            
            <Button 
              type="submit" 
              variant="yellowGradient" 
              className="w-full sm:w-auto float-right"
              disabled={saving}
            >
              {saving ? "Guardando Cambios..." : "Guardar Cambios"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-custom-dark">Perfil de Usuario</h2>
            <Button 
              variant="yellowGradient" 
              onClick={handleEditProfile}
            >
              Editar Perfil
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{profile?.first_name || "-"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Apellido</p>
                <p className="font-medium">{profile?.last_name || "-"}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Nombre de la Empresa</p>
              <p className="font-medium">{profile?.company_name || "-"}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Correo Electrónico</p>
              <p className="font-medium">{profile?.email || "-"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditSection;
