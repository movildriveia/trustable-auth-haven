
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard, UserProfile } from "@/lib/dashboard";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import DashboardLayout from "./dashboard/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getUserProfile } = useDashboard();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

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
          <h2 className="text-xl font-semibold text-custom-dark mb-6">Dashboard Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-blue-900">Welcome Back</h3>
              <p className="text-blue-800 mt-2">{profile?.first_name} {profile?.last_name}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-green-900">Documents</h3>
              <div className="flex justify-between items-end mt-2">
                <p className="text-2xl font-bold text-green-800">0</p>
                <p className="text-sm text-green-700">Uploaded Files</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-purple-900">AI Services</h3>
              <div className="flex justify-between items-end mt-2">
                <p className="text-2xl font-bold text-purple-800">3</p>
                <p className="text-sm text-purple-700">Available</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-custom-dark mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/dashboard/documents")}
              className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-custom-dark">Upload Documents</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your documents and files</p>
            </button>
            
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-custom-dark">Edit Profile</h3>
              <p className="text-sm text-gray-500 mt-1">Update your account information</p>
            </button>
            
            <button
              onClick={() => navigate("/dashboard/help")}
              className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-custom-dark">Get Help</h3>
              <p className="text-sm text-gray-500 mt-1">Contact support or browse FAQs</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
