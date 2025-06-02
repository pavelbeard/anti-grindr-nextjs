import * as ChatFeatures from "@/lib/features/chat.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const chats = await ChatFeatures.getChatsForCurrentUser();
  return new Response(JSON.stringify(chats), {
    status: 200,
  });
});
