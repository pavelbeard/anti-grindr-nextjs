import * as ChatService from "@/lib/api/member/chat/chat.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userA = searchParams.get("userA");
  const userB = searchParams.get("userB");

  if (!userA || !userB) {
    return new Response(
      JSON.stringify({
        error: "Missing userA or userB",
      }),
      {
        status: 400,
      }
    );
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
  const { searchParams } = new URL(request.url);
  const userA = searchParams.get("userA");
  const userB = searchParams.get("userB");

  if (!userA || !userB) {
    return new Response(
      JSON.stringify({
        error: "Missing userA or userB",
      }),
      {
        status: 400,
      }
    );
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
