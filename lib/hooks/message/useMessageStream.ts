import { Message } from "@/lib/data/chat/chat.types";
import { supabase } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseMessageStreamProps {
  chatId: string | null;
  scrollToBottom: () => void;
}

export const useMessageStream = ({
  chatId,
  scrollToBottom,
}: UseMessageStreamProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!chatId) return;

    const eventSource = new EventSource(`/api/chat/${chatId}/stream`);

    eventSource.onmessage = (e) => {
      try {
        const newMessages: Message[] = JSON.parse(e.data);

        queryClient.setQueryData(
          ["chatMessages", chatId],
          (oldData: Message[] | undefined) => {
            if (!newMessages.length) return oldData ?? [];

            if (!oldData) return newMessages;

            const lastOld = oldData[oldData.length - 1];
            const lastNew = newMessages[newMessages.length - 1];

            if (!lastOld || lastOld.createdAt !== lastNew.createdAt) {
              scrollToBottom();
              const filteredNew = newMessages.filter(
                (m) => !oldData.some((om) => om.createdAt === m.createdAt)
              );
              return [...oldData, ...filteredNew];
            }
            return oldData;
          }
        );
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      // console.error("SSE connection error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, [chatId, queryClient, scrollToBottom]);
};

export const useMessageStreamSupabase = (initialFeed: {
  data: Message[];
  error: any[];
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [feed, setFeed] = useState<Message[]>(() => {
    if (!initialFeed?.data) return [];

    if (!initialFeed.error) {
      console.log("Error in initial feed:", initialFeed.error);
      return [];
    }

    return initialFeed.data;
  });

  useEffect(() => {
    if (isConnected) return;

    const channel = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new as Message;
          setFeed((prevFeed) => [...prevFeed, newMessage]);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
      setIsConnected(false);
    };
  }, [isConnected]);

  return {
    feed,
    setFeed,
    isConnected,
    setIsConnected,
  };
};
