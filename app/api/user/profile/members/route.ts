import * as ProfileFeatures from "@/lib/features/profile.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "30", 10);
  const members = await ProfileFeatures.getMembers({ offset, limit });
  return new Response(JSON.stringify({ members }), {
    status: 200,
  });
});
