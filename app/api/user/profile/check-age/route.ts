import * as ProfileService from "@/lib/api/user/profile/profile.service";
import { auth } from "@clerk/nextjs/server";

// CHANGED
export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile?.date_of_birth) {
    return new Response(
      JSON.stringify({
        error: "Date of birth not found",
      }),
      {
        status: 400,
      }
    );
  }

  return new Response("ok", { status: 200 });
}
