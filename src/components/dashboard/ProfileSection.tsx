
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ProfileData {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  company_name?: string;
  [key: string]: any;
}

const ProfileSection = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user profile data
  const fetchProfile = async () => {
    setLoading(true);
    const { profile: userProfile, error } = await getUserProfile();
    if (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } else {
      setProfile(userProfile);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle edit button click
  const handleEditClick = () => {
    console.log("Edit button clicked");
    setIsEditing(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!profile) return;
    
    const { success, error } = await updateUserProfile(profile);
    
    if (success) {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      await fetchProfile(); // Refetch profile data to update the UI
    } else {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
    
    setLoading(false);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  if (loading && !profile) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                value={profile?.first_name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                value={profile?.last_name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile?.email || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                type="text"
                value={profile?.company_name || ""}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">First Name</h3>
                <p>{profile?.first_name || "Not set"}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Last Name</h3>
                <p>{profile?.last_name || "Not set"}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                <p>{profile?.email || "Not set"}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Company</h3>
                <p>{profile?.company_name || "Not set"}</p>
              </div>
            </div>
            
            <Button onClick={handleEditClick} className="mt-4">
              Editar Perfil
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
