import * as ChatService from "@/lib/data/chat/chat.service";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// CHANGED
export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const chatId = (await params).chatId;
  const userId = (await auth()).userId;
  const text = await request.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!chatId) {
    return new Response("Chat id is required", { status: 400 });
  }

  if (!text) {
    return new Response("Text is required", { status: 400 });
  }

  await ChatService.createMessage({
    chatId,
    userId,
    text,
  });

  return NextResponse.json({ status: 200 });
}
