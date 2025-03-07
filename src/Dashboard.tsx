
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard, UserProfile } from "@/lib/dashboard";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import DashboardLayout from "./dashboard/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getUserProfile, updateUserProfile } = useDashboard();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const { profile, error } = await getUserProfile();

        if (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to load user profile");
        } else {
          setProfile(profile);
          setFormData(profile || {});
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleEditProfile = async () => {
    try {
      const { success, error } = await updateUserProfile(formData);
      if (success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        const { profile } = await getUserProfile();
        setProfile(profile);
      } else {
        toast.error(`Failed to update profile: ${error?.message}`);
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-custom-dark mb-6">Profile Overview</h2>
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={formData.first_name || ""}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={formData.last_name || ""}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={formData.company_name || ""}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="Company Name"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleEditProfile}
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
