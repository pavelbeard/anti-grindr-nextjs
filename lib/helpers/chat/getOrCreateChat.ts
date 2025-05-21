import { client } from "@/lib/fetchClient";

export default async function getOrCreateChat(
  userId: string,
  memberId: string
) {
  const chat = await client(`/api/chat/between`, {
    method: "POST",
    body: JSON.stringify({ userA: memberId, userB: userId }),
    headers: { "Content-Type": "application/json" },
  });

  return chat.chatId;
}
