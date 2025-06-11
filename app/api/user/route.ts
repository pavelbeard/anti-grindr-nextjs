import * as UserFeatures from "@/lib/features/user.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const user = await UserFeatures.getCurrentUser();
  return new Response(JSON.stringify(user), {
    status: 200,
  });
});
