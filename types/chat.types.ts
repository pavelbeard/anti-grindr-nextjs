import * as ChatFeatures from "@/lib/features/chat.features";
import { supabase } from "@/lib/supabase/client";

export interface SendMessageParams {
  text: string;
}

export type Channel = ReturnType<typeof supabase.channel>;

export interface ChatItemProps {
  chat: Awaited<ReturnType<typeof ChatFeatures.getChatsForCurrentUser>>[number];
}

export type ChatsForUser = Awaited<
  ReturnType<typeof ChatFeatures.getChatsForCurrentUser>
>;
