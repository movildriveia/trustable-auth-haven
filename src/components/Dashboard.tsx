
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard, UserProfile } from "@/lib/dashboard";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import DashboardLayout from "./dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getUserProfile, updateUserProfile } = useDashboard();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: ""
  });

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
    
    checkAuth();
  }, [navigate]);

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
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Dashboard Overview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-custom-dark mb-6">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-blue-900">Welcome Back</h3>
                  <p className="text-blue-800 mt-2">{profile?.first_name} {profile?.last_name}</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-green-900">Documents</h3>
                  <div className="flex justify-between items-end mt-2">
                    <p className="text-2xl font-bold text-green-800">{profile?.doc_count || 0}</p>
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/dashboard/documents")}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-custom-dark">Upload Documents</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your documents and files</p>
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
          
          {/* Right Column - My Profile */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-custom-dark mb-6">My Profile</h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    value={profile?.email || ""}
                    disabled
                    readOnly
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Email address cannot be changed</p>
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="yellowGradient" 
                className="w-full sm:w-auto float-right"
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
