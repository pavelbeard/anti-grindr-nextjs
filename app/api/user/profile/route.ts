import * as UserFeatures from "@/lib/features/user.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";

export const GET = withErrorHandler(async (request: Request) => {
  const profile = await UserFeatures.getUserProfile();
  return new Response(JSON.stringify(profile), { status: 200 });
});

export const POST = withErrorHandler(async (request: Request) => {
  const { day, month, year } = await request.json();
  const profile = await UserFeatures.createProfile({
    day,
    month,
    year,
  });

  return new Response(JSON.stringify(profile), { status: 201 });
});

export const PATCH = withErrorHandler(async (request: Request) => {
  const data = await request.json();
  const updatedProfile = await UserFeatures.updateProfile(data);

  return new Response(JSON.stringify({ profile: updatedProfile }), {
    status: 200,
  });
});
