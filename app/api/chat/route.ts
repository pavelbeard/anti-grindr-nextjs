import * as ChatsService from "@/lib/api/member/chat/chat.service";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chats = await ChatsService.getChatsForUser(clerkUserId);

  return new Response(JSON.stringify(chats), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
