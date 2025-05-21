import { client } from "@/lib/fetchClient";

export default async function getMessages({
  chatId,
  offset = 0,
  limit = 20,
}: {
  chatId: string;
  offset?: number;
  limit?: number;
}) {
  const initialMessages = await client(
    `/api/chat/${chatId}?offset=${offset}&limit=${limit}`,
    { method: "GET" }
  );

  if (!initialMessages) {
    throw new Error("Failed to fetch messages");
  }

  return initialMessages;
}
