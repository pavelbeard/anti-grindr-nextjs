import { client } from "@/lib/api/client";

export default async function getOrCreateChat(
  currentMemberId: string,
  userId: string
) {
  const chat = await client(`/api/chat/between`, {
    method: "POST",
    body: JSON.stringify({ userA: currentMemberId, userB: userId }),
    headers: { "Content-Type": "application/json" },
  });

  return chat.chatId;
}
