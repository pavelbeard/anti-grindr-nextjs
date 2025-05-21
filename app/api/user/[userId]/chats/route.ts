import * as ChatsService from "@/lib/api/member/chat/chat.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response("userId is required", { status: 400 });
  }

  const chats = await ChatsService.getChatsForUser(userId);

  return new Response(JSON.stringify(chats), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
