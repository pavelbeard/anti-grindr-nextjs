import * as ChatService from "@/lib/api/member/chat/chat.service";

export async function POST(request: Request) {
  const { userA, userB } = await request.json();

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

  return new Response(JSON.stringify({ chatId: chat?.id }), { status: 200 });
}
