import * as ChatService from "@/lib/api/member/chat/chat.service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const chatId = (await params).chatId;
  const { userId, text } = await request.json();

  if (!userId || !text) {
    return new Response(
      JSON.stringify({
        error: "Missing userId or text",
      }),
      {
        status: 400,
      }
    );
  }

  await ChatService.createMessage({
    chatId,
    userId,
    text,
  });

  return new Response("ok", { status: 200 });
}
