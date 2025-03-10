import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileSection from "@/components/dashboard/ProfileSection";
import { getUserProfile } from "@/utils/supabase"; // Adjust the import path as needed

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

  const handleEditProfile = async () => {
    // Fetch the profile data again when the "Editar Perfil" button is clicked
    await fetchProfile();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-custom-dark">Mi Perfil</h1>
        <ProfileSection profile={profile} onEdit={handleEditProfile} />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
