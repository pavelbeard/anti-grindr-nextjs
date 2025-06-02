import * as UserService from "@/lib/data/user/user.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response("User id is required", { status: 400 });
  }

  const user = await UserService.getUserById(userId);

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
