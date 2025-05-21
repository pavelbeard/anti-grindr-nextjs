import * as ProfileService from "@/lib/api/user/profile/profile.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

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
