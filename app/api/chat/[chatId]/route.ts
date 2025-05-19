import * as ChatService from "@/lib/api/chat/chat.service";

type Params = {
  chatId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { chatId } = await params;
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 0);
  const limit = parseInt(searchParams.get("limit") || "20", 0);

  try {
    const messages = await ChatService.getMessagesByChatId(
      chatId,
      offset,
      limit
    );

    return new Response(JSON.stringify(messages), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return new Response("Error fetching chat messages", {
      status: 500,
    });
  }
}
