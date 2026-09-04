import { ProfileCard, type ProfileInfo } from "@/components/profile/profile-card";

const mockProfile: ProfileInfo = {
  name: "Yeang Ouyeng",
  role: "System Administrator",
  username: "yeang.ouyeng",
  gender: "Male",
  phone: "+855 12 345 678",
  email: "yeang.ouyeng@example.com",
  // avatarUrl: "/path/to/avatar.jpg", // Uncomment if avatar is needed
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileCard profile={mockProfile} />
    </div>
  );
}
