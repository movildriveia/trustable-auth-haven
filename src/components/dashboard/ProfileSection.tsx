import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/utils/supabase"; // Adjust the import path

const ProfileSection = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile data
  const fetchProfile = async () => {
    const { profile: userProfile, error } = await getUserProfile();
    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(userProfile);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = await updateUserProfile(profile);
    if (success) {
      setIsEditing(false);
      await fetchProfile(); // Refetch profile data to update the UI
    } else {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={profile?.first_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, first_name: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={profile?.email || ""}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Name: {profile?.first_name}</p>
          <p>Email: {profile?.email}</p>
          <button onClick={handleEditClick}>Editar Perfil</button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
