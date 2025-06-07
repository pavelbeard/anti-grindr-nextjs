import { supabase } from "@/lib/supabase/client";
import { SendMessageParams } from "@/types/chat.types";
import { useCallback, useEffect, useRef, useState } from "react";

type Channel = ReturnType<typeof supabase.channel>;

interface UseBroadcast<T = unknown> {
  toUserId: string;
  roomName: string;
  event: string;
  onMessage: (payload: T) => void;
}

/*
 * useBroadcast is a custom hook for subscribing to a Supabase channel
 * and handling broadcast messages.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {string} params.roomName - The name of the room to subscribe to.
 * @param {string} params.event - The event type to listen for.
 * @param {function} params.onMessage - Callback function to handle incoming messages.
 * Should be wrapped in useCallback to avoid unnecessary re-renders.
 * @returns {Object} An object containing the channel instance and connection status.
 */
export default function useBroadcast<T>({
  toUserId,
  roomName,
  event,
  onMessage,
}: UseBroadcast<T>) {
  const hasMounted = useRef(false);
  const channel = useRef<Channel | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = useCallback(
    async ({ text }: SendMessageParams) => {
      if (!roomName || !toUserId || !text) return;

      if (!channel.current) {
        console.warn("Channel is not initialized.");
        return;
      }

      // Send a broadcast message
      await channel.current.send({
        type: "broadcast",
        event,
        payload: {
          toUserId,
          text,
          createdAt: new Date(),
        },
      });

      // Send a message to the database
      fetch(`/api/chat/${roomName}/messages?toUserId=${toUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          createdAt: new Date(),
        }),
      });
    },
    [channel]
  );

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_REACT_STRICT_MODE === "true"
    ) {
      console.warn(
        "useBroadcast is being called multiple times with React.StrictMode, which may lead to unexpected behavior." +
          " Ensure this hook is only used once per component instance."
      );
      if (!hasMounted.current) {
        hasMounted.current = true;
        return;
      }
    }

    const channelInstance = supabase.channel(roomName);
    channelInstance
      .on("broadcast", { event: "Test message" }, () => {
        console.log(`⚙️ Test message for ${roomName}`);
      })
      .on("broadcast", { event }, (payload) => {
        console.log(`📬 Received message on channel ${roomName}:`, payload);
        onMessage(payload as T);
      })
      .subscribe((status) => {
        console.log(`Channel ${roomName} subscription status:`, status);
        if (status === "SUBSCRIBED") {
          console.log(`🔌 Subscribing for channel ${roomName}`);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });

    channel.current = channelInstance;

    return () => {
      if (channel.current) {
        console.log(`🧹 Unsubscribing from channel ${roomName}`);
        supabase.removeChannel(channel.current);
        channel.current = null;
      }
    };
  }, [roomName, event, channel]); // Ensure roomName and onMessage are stable

  return {
    isConnected,
    channel: channel.current,
    sendMessage,
  };
}
