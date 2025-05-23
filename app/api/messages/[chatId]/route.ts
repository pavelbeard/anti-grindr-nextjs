import * as MessageService from "@/lib/api/message/message.service";

export async function GET(
  request: Request,
  {
    params,
  }: { params: Promise<{ chatId: string; offset?: number; limit?: number }> }
) {
  const chatId = (await params).chatId;
  const offset = (await params).offset;
  const limit = (await params).limit;

  if (!chatId) {
    return new Response("Chat id is required", { status: 400 });
  }

  const messages = await MessageService.getMessagesForChat({
    chatId,
    offset,
    limit,
  });

  if (!messages) {
    return new Response("Chat not found", { status: 404 });
  }

  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
