import * as ProfileFeatures from "@/lib/features/profile.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const members = await ProfileFeatures.getMembers();
  return new Response(JSON.stringify({ users: members }), {
    status: 200,
  });
});
