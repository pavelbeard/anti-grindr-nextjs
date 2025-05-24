import * as UserService from "@/lib/api/user/user.service";
import { auth } from "@clerk/nextjs/server";

// CHANGED
export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  if (!body.status) {
    return new Response("Missing status", { status: 400 });
  }

  await UserService.updateUser({
    clerkUserId: userId,
    data: {
      online: body.status === "online",
      lastActive: new Date(),
    },
  });

  return new Response("ok", { status: 200 });
}
