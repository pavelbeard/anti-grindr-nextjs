import { ChatMember, Message, Profile } from "@/app/generated/prisma";
import { client } from "@/lib/fetchClient";
import { useEffect, useState } from "react";

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
export default function useGetChatsForUser() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const data = await client(`/api/user/chats`, { method: "GET" });
      setChats(data);
    } catch (error: any) {
      console.error("Error fetching chats:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    loading,
    error,
  };
}
