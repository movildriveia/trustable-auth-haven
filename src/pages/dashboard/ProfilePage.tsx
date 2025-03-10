import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileSection from "@/components/dashboard/ProfileSection";
import { getUserProfile } from "@/lib/supabase"; // Adjust the import path as needed

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { profile: userProfile, error } = await getUserProfile();
    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(userProfile);
    }
    setLoading(false);
  };

  // Function to handle profile updates
  const handleUpdateProfile = async (updatedProfile) => {
    const { success, error } = await updateUserProfile(updatedProfile);
    if (success) {
      await fetchProfile(); // Refetch profile data to update the UI
    } else {
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-custom-dark">Profile</h1>
        <ProfileSection
          profile={profile}
          onUpdate={handleUpdateProfile}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
