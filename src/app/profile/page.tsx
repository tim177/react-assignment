import { ProfileForm } from "@/components/profile-form";

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      <div className="max-w-2xl">
        <ProfileForm />
      </div>
    </div>
  );
}
