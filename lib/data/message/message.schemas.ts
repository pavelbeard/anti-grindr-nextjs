import { z } from "zod";

export const SendMessageSchema = z.object({
  text: z.string().min(1, "Message is required"),
});

export type SendMessageType = z.infer<typeof SendMessageSchema>;
