import * as UserFeatures from "@/lib/features/user.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const members = await UserFeatures.getMembers();
  return new Response(JSON.stringify({ users: members }), {
    status: 200,
  });
});
