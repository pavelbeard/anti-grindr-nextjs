import useGetChatsForUser from "@/lib/hooks/members/tabs/useGetChatsForUser";
import Link from "next/link";

export default function Chats({ userId }: { userId: string }) {
  const { chats, loading, error } = useGetChatsForUser(userId);

  return (
    <div className="flex flex-col items-center min-w-[600px] h-full bg-black p-4">
      {error && <div>Error loading chats</div>}
      {loading || (chats && chats.length === 0) && <div className="size-32">Loading...</div>}
      {chats && chats.length > 0 && (
        <div className="flex flex-col text-white w-full">
          {chats.map((chat, index) => (
            <Link
              key={index}
              href={`/members/${chat.members[1].userId}/chat`}
              className="flex items-center gap-x-4 p-4 border-b-[0.5px] border-zinc-700"
            >
              <h2 className="text-lg font-semibold">
                {chat.members[1].user.Profile.name}
              </h2>
              <p className="text-sm text-gray-500">{chat.messages[0].text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
