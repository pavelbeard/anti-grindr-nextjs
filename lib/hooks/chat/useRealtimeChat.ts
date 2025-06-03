import { EVENT_MESSAGE_TYPE } from "@/lib/constants";
import { SimpleMessage } from "@/lib/data/chat/chat.types";
import { supabase } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

interface UseRealtimeChatProps {
  roomName: string;
  userId: string;
}

export default function useRealtimeChat({
  roomName,
  userId,
}: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<SimpleMessage[]>([]);
  const [channel, setChannel] = useState<ReturnType<
    typeof supabase.channel
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newChannel = supabase.channel(roomName);

    newChannel
      .on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          payload.payload as SimpleMessage,
        ]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [roomName, userId, supabase]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!channel || !isConnected) return;

      const newMessage: SimpleMessage = {
        userId,
        text,
        createdAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      await channel.send({
        type: "broadcast",
        event: EVENT_MESSAGE_TYPE,
        payload: newMessage,
      });
    },
    [channel, isConnected, roomName]
  );

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
