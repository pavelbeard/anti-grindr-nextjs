import { supabase } from "@/lib/supabase/client";

export interface SendMessageParams {
  text: string;
}

export type Channel = ReturnType<typeof supabase.channel>;
