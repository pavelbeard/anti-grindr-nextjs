import * as ChatFeatures from "@/lib/features/chat.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "30", 10);

  console.log(`Fetching chats with offset: ${offset}, limit: ${limit}`);

  const chats = await ChatFeatures.getChatsForCurrentUser({ offset, limit });
  return new Response(JSON.stringify({ chats }), {
    status: 200,
  });
});
