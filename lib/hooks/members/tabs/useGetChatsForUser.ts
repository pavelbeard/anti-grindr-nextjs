import { client } from "@/lib/api/client";
import { useEffect, useState } from "react";

export default function useGetChatsForUser() {
  // This is a placeholder for the actual implementation.
  // You would typically fetch data from an API or a database here.
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const data = await client("/api/chat", { method: "GET" });
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
