import * as ProfileService from "@/lib/api/profile/profile.service";

export async function GET(request: Request) {
  const { clerkUserId } = await request.json();

  const profile = await ProfileService.getProfileByClerkId(clerkUserId);

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
