import * as UserService from "@/lib/api/user/user.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response("User id is required", { status: 400 });
  }

  const user = await UserService.getUserById(userId);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify({ userId: user.id }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
