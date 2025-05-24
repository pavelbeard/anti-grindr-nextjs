import * as ChatsService from "@/lib/api/member/chat/chat.service";
import { auth } from "@clerk/nextjs/server";

// CHANGED
// CHANGE getChatsForUser
export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chats = await ChatsService.getChatsForUser(userId);

  return new Response(JSON.stringify(chats), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
