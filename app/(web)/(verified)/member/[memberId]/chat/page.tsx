import ChatClient from "@/components/web/members/chat/chat-client";
import * as UserService from "@/lib/api/user/user.service";
import * as ProfileService from "@/lib/api/user/profile/profile.service";
import WithoutPhoto from "@/public/without-photo.png";
import getUser from "@/lib/helpers/user/getUser";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const userA = await getUser();
  const userB = await UserService.getUserById(memberId);

  if (!userB || !memberId) {
    return (
      <section className="min-w-[600px] flex flex-col gap-y-4 flex-1 items-center justify-start max-w-xl border-l border-r border-zinc-700 p-4">
        <p className="text-white">Member not found</p>
      </section>
    );
  }

  const profile = await ProfileService.getProfileByUserId(memberId);

  return (
    <ChatClient
      userA={userA.id}
      userB={memberId}
      profileAvatar={profile?.avatar ?? WithoutPhoto.src}
      profileName={profile?.name ?? null}
      online={userB?.online ?? false}
      lastActive={userB?.lastActive ?? new Date()}
    />
  );
}
