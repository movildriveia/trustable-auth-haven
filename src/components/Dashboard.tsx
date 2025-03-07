
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDashboard, UserProfile } from "@/lib/dashboard";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
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

  const handleLogout = async () => {
    await logout();
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-custom-dark">Nexus FinLabs Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome,</p>
              <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Profile</h3>
              <p className="text-sm text-blue-800 mb-4">Your account information</p>
              <Button 
                variant="gradient" 
                className="text-sm" 
                onClick={() => navigate("/profile")}
              >
                View Profile
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-green-900 mb-2">Documents</h3>
              <p className="text-sm text-green-800 mb-4">Manage your uploads</p>
              <Button 
                variant="blue" 
                className="text-sm" 
                onClick={() => navigate("/documents")}
              >
                View Documents
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-purple-900 mb-2">Settings</h3>
              <p className="text-sm text-purple-800 mb-4">Configure your account</p>
              <Button 
                variant="reverseGradient" 
                className="text-sm" 
                onClick={() => navigate("/settings")}
              >
                View Settings
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
