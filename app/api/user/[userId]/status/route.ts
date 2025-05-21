import * as UserService from "@/lib/api/user/user.service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response("userId is required.", { status: 400 });
  }

  const body = await request.json();

  if (!body.status) {
    return new Response("Missing status", { status: 400 });
  }

  await UserService.updateUser({
    userId,
    data: {
      online: body.status === "online",
      lastActive: new Date(),
    },
  });

  return new Response("ok", { status: 200 });
}
