import * as UserFeatures from "@/lib/features/user.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

// CHANGED
export const GET = withErrorHandler(async (request: Request) => {
  const doesMemberHave18 = await UserFeatures.checkAge();
  if (!doesMemberHave18) {
    return new Response("User doesn't have 18", { status: 400 });
  }

  return new Response("ok", { status: 200 });
});
