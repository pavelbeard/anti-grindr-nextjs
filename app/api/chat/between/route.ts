import * as ChatFeatures from "@/lib/features/chat.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const chat = await ChatFeatures.getChat(searchParams.get("withUserId"));
  return new Response(JSON.stringify(chat), {
    status: 200,
  });
});

export const POST = withErrorHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const createdChat = await ChatFeatures.createChat(
    searchParams.get("withUserId")
  );
  return new Response(JSON.stringify(createdChat), {
    status: 200,
  });
});
