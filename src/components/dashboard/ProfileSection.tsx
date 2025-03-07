
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboard, UserProfile } from "@/lib/dashboard";
import { toast } from "sonner";

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
    const { profile, error } = await getUserProfile();
    
    if (error) {
      toast.error("Failed to load profile");
    } else if (profile) {
      setProfile(profile);
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    const { success, error } = await updateUserProfile({
      first_name: profile.first_name,
      last_name: profile.last_name,
      company_name: profile.company_name,
    });
    
    if (success) {
      toast.success("Profile updated successfully");
    } else if (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-custom-dark mb-6">Profile</h2>
        <div className="text-center py-6">Loading profile information...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-custom-dark mb-6">Profile Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={profile?.first_name || ""}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={profile?.last_name || ""}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            name="company_name"
            value={profile?.company_name || ""}
            onChange={handleChange}
            placeholder="Company Name"
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
          <p className="text-xs text-gray-500">Email cannot be changed</p>
        </div>
        
        <div className="pt-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;
