import * as ChatService from "@/lib/api/member/chat/chat.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;

  if (!chatId) {
    return NextResponse.error();
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const messages = await ChatService.getMessagesByChatId(chatId);
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(messages)}\n\n`)
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
