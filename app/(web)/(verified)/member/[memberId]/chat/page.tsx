import ChatClient from "@/components/web/members/chat/chat-client";
import getUser from "@/lib/helpers/user/getUser";
import * as ProfileService from "@/lib/api/user/profile/profile.service";
import WithoutPhoto from "@/public/without-photo.png";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const user = await getUser();
  const profile = await ProfileService.getProfileByUserId(user.id);

  return (
    <ChatClient
      userId={user.id}
      memberId={memberId}
      profileAvatar={profile?.avatar ?? WithoutPhoto.src}
      profileName={profile?.name ?? null}
    />
  );
}
