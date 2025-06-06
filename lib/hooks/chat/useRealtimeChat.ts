import { EVENT_MESSAGE_TYPE } from "@/lib/constants";
import { Message } from "@/lib/data/chat/chat.types";
import { supabase } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

interface UseRealtimeChatProps {
  roomName: string | undefined;
  userId: string;
}

export default function useRealtimeChat({
  roomName,
  userId,
}: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [channel, setChannel] = useState<ReturnType<
    typeof supabase.channel
  > | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (!roomName || !userId) {
      console.warn("Room name or user ID is not provided.");
      return;
    }

    const newChannel = supabase.channel(roomName);

    newChannel
      .on("broadcast", { event: "Test message" }, (payload) => {
        console.log("Test message event received.", payload);
      })
      .on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
        console.log("Received message:", payload);

        setMessages((prevMessages) => [
          ...prevMessages,
          payload.payload as Message,
        ]);
      })
      .subscribe(async (status) => {
        console.log("Channel subscription status:", status);

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
      if (!channel || !isConnected || !roomName) return;

      const newMessage: Message = {
        userId,
        text,
        createdAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const messageSent = await channel.send({
        type: "broadcast",
        event: EVENT_MESSAGE_TYPE,
        payload: newMessage,
      });

      fetch(`/api/chat/${roomName}/messages?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newMessage.text }),
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
