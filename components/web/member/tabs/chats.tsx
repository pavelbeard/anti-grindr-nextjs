import useGetChatsForUser from "@/lib/hooks/members/tabs/useGetChatsForUser";

export default function Chats() {
  const { chats, loading, error } = useGetChatsForUser();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold">Chats</h1>
      {error && <div>Error loading chats</div>}
      {loading && <div className="size-32">Loading...</div>}
      {chats && chats.length === 0 && (
        <div className="text-center">
          <h2 className="text-lg font-semibold">No chats available</h2>
          <p className="text-sm text-gray-500">
            Start a conversation with someone!
          </p>
        </div>
      )}
      {chats && chats.length > 0 && (
        <div className="flex flex-col gap-4">
          {chats.map((chat, index) => (
            <div key={index} className="p-4 border-b border-gray-300">
              {/* <h2 className="text-lg font-semibold">{chat.name}</h2> */}
              {/* <p className="text-sm text-gray-500">{chat.lastMessage}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
