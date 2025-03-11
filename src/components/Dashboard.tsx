
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DocumentsSection from "@/components/dashboard/DocumentsSection";
import DocumentsContainer from "./DocumentsContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, Clock, Key, LogOut, LayoutDashboard } from "lucide-react";
import { useDashboard } from "@/lib/dashboard";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface FormData {
  first_name: string;
  last_name: string;
  company_name: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { getUserProfile, updateUserProfile } = useDashboard();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    company_name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        company_name: profile.company_name || "",
      });
    }
  }, [profile]);

  const loadUserProfile = async () => {
    setLoading(true);
    const { profile, error } = await getUserProfile();
    if (profile) {
      setProfile(profile);
    } else if (error) {
      console.error("Error loading profile:", error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.company_name) newErrors.company_name = "Company name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    const { success, error } = await updateUserProfile(formData);
    if (success) {
      setIsEditing(false);
      loadUserProfile(); // Reload the profile to reflect the changes
    } else {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-custom-dark mb-6">Profile Overview</h2>
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="First Name"
                  className={`w-full p-2 border rounded ${errors.first_name ? "border-red-500" : ""}`}
                />
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Last Name"
                  className={`w-full p-2 border rounded ${errors.last_name ? "border-red-500" : ""}`}
                />
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Company Name"
                  className={`w-full p-2 border rounded ${errors.company_name ? "border-red-500" : ""}`}
                />
                {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
                <button
                  onClick={handleSaveProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p>First Name: {profile?.first_name}</p>
                <p>Last Name: {profile?.last_name}</p>
                <p>Company Name: {profile?.company_name}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Editar Perfil
                </button>
              </div>
            )}
          </div>
          <DocumentsContainer />
        </div>

        <DocumentsSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
