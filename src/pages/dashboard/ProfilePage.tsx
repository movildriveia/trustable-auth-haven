
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileSection from "@/components/dashboard/ProfileSection";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-custom-dark">My Profile</h1>
        <ProfileSection />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
