import UserBar from "./members-user-bar";
import * as UserFeatures from "@/lib/features/user.features";
import WithoutPhoto from "@/public/without-photo.png";

export default async function MembersHeader() {
  const profile = await UserFeatures.getUserProfile();

  let avatar;

  if (profile?.avatar) {
    avatar = profile.avatar;
  } else {
    avatar = WithoutPhoto.src;
  }
  return (
    <header className="text-center flex items-center gap-x-4 w-full bg-black h-16 p-4 border-b border-zinc-700">
      <UserBar profile={profile} photoFallback={WithoutPhoto.src} />
      <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
    </header>
  );
}
