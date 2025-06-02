import { ChatMember, Message, Profile } from "@/app/generated/prisma";
import { fetcher } from "@/lib/fetchClient";
import Link from "next/link";
import useSWR from "swr";

type ChatMemberWithUser = ChatMember & {
  user: {
    Profile: Profile;
  };
};

type Chat = {
  messages: Message[];
  members: ChatMemberWithUser[];
};

// CHANGED
export default function Chats() {
  const {
    data: chats,
    isLoading,
    error,
  }: { data: Chat[]; isLoading: boolean; error: any } = useSWR(
    `/api/user/chats`,
    fetcher
  );

  return (
    <div className="flex flex-col items-center min-w-[600px] h-full bg-black p-4">
      {error && <div>Error loading chats</div>}
      {isLoading ||
        (chats && chats.length === 0 && (
          <div className="size-32">Loading...</div>
        ))}
      {chats && chats.length > 0 && (
        <div className="flex flex-col text-white w-full">
          {chats.map((chat, index) => (
            <Link
              key={index}
              href={`/member/${chat.members[1].userId}/chat`}
              className="flex items-center gap-x-4 p-4 border-b-[0.5px] border-zinc-700"
            >
              <h2 className="text-lg font-semibold">
                {chat.members[1].user.Profile.name}
              </h2>
              <p className="text-sm text-gray-500">{chat.messages[0]?.text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
