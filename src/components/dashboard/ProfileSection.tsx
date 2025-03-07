
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast.error("No active session");
        setLoading(false);
        return;
      }
      
      const userId = sessionData.session.user.id;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        toast.error(`Failed to load profile: ${error.message}`);
      } else if (data) {
        setProfile(data);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
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
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast.error("No active session");
        setSaving(false);
        return;
      }
      
      const userId = sessionData.session.user.id;
      
      // Ensure user can only modify their own profile
      if (userId !== profile.id) {
        toast.error("You can only modify your own profile");
        setSaving(false);
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          company_name: profile.company_name,
          company_description: profile.company_description,
          company_website: profile.company_website,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        toast.error(`Failed to update profile: ${error.message}`);
      } else {
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setSaving(false);
    }
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
          <Label htmlFor="company_description">Company Description</Label>
          <textarea
            id="company_description"
            name="company_description"
            value={profile?.company_description || ""}
            onChange={handleChange}
            placeholder="Brief description of your company"
            className="w-full h-24 px-3 py-2 text-base text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company_website">Company Website</Label>
          <Input
            id="company_website"
            name="company_website"
            type="url"
            value={profile?.company_website || ""}
            onChange={handleChange}
            placeholder="https://example.com"
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
        
        <div className="space-y-2">
          <Label htmlFor="doc_count">Document Count</Label>
          <Input
            id="doc_count"
            name="doc_count"
            value={profile?.doc_count || 0}
            disabled
            readOnly
            className="bg-gray-100"
          />
          <p className="text-xs text-gray-500">This is updated automatically</p>
        </div>
        
        <div className="pt-4">
          <Button type="submit" variant="yellowGradient" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;
