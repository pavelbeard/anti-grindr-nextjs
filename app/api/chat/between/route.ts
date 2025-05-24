import * as ChatService from "@/lib/api/member/chat/chat.service";
import { auth } from "@clerk/nextjs/server";

// CHANGED
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { userId: userA } = await auth();
  const userB = searchParams.get("userB");

  if (!userA) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!userB) {
    return new Response(JSON.stringify({ error: "Missing userB" }), {
      status: 400,
    });
  }

  const chat = (await ChatService.getPrivateChat(userA, userB)).find(
    (c) =>
      c.members.length === 2 &&
      c.members.some((m) => m.userId === userA) &&
      c.members.some((m) => m.userId === userB)
  );

  if (!chat) {
    return new Response(
      JSON.stringify({
        error: "Not found",
      }),
      {
        status: 404,
      }
    );
  }

  return new Response(JSON.stringify({ chatId: chat?.id }), { status: 200 });
}

export async function POST(request: Request) {
  const { userId: userA } = await auth();
  const { searchParams } = new URL(request.url);
  const userB = searchParams.get("userB");

  if (!userA) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!userB) {
    return new Response(JSON.stringify({ error: "Missing userB" }), {
      status: 400,
    });
  }

  const createdChat = await ChatService.createChat(userA, userB);

  if (!createdChat) {
    return new Response(
      JSON.stringify({
        error: "Failed to create chat",
      }),
      {
        status: 500,
      }
    );
  }

  return new Response(JSON.stringify({ chatId: createdChat.id }), {
    status: 200,
  });
}
