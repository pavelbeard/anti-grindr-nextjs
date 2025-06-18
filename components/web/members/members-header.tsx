import { Sidebar, SidebarTrigger } from "@/components/ui/sidebar";
import UserBar from "./members-user-bar";
import * as ProfileFeatures from "@/lib/features/profile.features";
import WithoutPhoto from "@/public/without-photo.png";
import MembersSidebar from "./members-sidebar";

export default async function MembersHeader() {
  const profile = await ProfileFeatures.getUserProfile();

  let avatar;

  if (profile?.avatar) {
    avatar = profile.avatar;
  } else {
    avatar = WithoutPhoto.src;
  }
  return (
    <header className="text-center flex items-center gap-x-4 w-full bg-black h-16 p-4 border-b border-zinc-700">
      <SidebarTrigger className="bg-green-600 hover:bg-green-500!" />
      <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
    </header>
  );
}
