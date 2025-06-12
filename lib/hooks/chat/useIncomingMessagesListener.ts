"use client";

import { EVENT_INCOMING_MESSAGE_TYPE } from "@/lib/constants";
import { IncomingSimpleMessage } from "@/lib/data/chat/chat.types";
import { useChatModalStore } from "@/lib/store/useChatModalStore";
import useSupabaseClient from "@/lib/supabase/client";
import { Channel } from "@/types/chat.types";
import { useSession } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

/**
 * useIncomingMessagesListener is a custom hook that listens for incoming messages
 * on a Supabase channel and opens a chat modal when a new message is received.
 *
 * @returns {
 *   isConnected: boolean;
 *   channel: Channel | null;
 * } An object containing the connection status and the channel instance.
 */

export default function useIncomingMessagesListener(): {
  isConnected: boolean;
  channel: Channel | null;
} {
  const supabase = useSupabaseClient();
  const channel = useRef<Channel | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Use open chat and user for opening a chat when a new message is received
  const { openChat } = useChatModalStore();
  const { session } = useSession();

  // Opens a chat to user who received the message from another user
  useEffect(() => {
    if (!session) return;

    const channelInstance = supabase.channel("incoming-messages");
    channelInstance
      .on("broadcast", { event: "Test message" }, () => {
        console.log(`⚙️ Test message for incoming-messages channel`);
      })
      .on(
        "broadcast",
        { event: EVENT_INCOMING_MESSAGE_TYPE },
        ({ payload }: { payload: IncomingSimpleMessage }) => {
          if (session.user.id === payload.toUserId) {
            console.log(
              `📥 Incoming message received: ${payload.text} from ${payload.userId}`
            );

            openChat({
              chatId: payload.chatId,
              userIdReceiver: payload.userId,
            });
          }
        }
      )
      .subscribe((status) => {
        console.log(`Channel incoming-messages subscription status:`, status);
        if (status === "SUBSCRIBED") {
          console.log(`🔌 Subscribed to incoming messages channel`);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });

    channel.current = channelInstance;

    return () => {
      if (channel.current) {
        console.log(`🧹 Unsubscribing from incoming messages channel`);
        supabase.removeChannel(channel.current);
        channel.current = null;
      }
    };
  }, [session]);

  return {
    isConnected,
    channel: channel.current,
  };
}
