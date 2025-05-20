import * as UserService from "@/lib/api/user/user.service";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { userId: clerkUserId } = await auth();
  const body = await request.json();
  const { status, lastActive } = body;

  if (!clerkUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!status) {
    return new Response("Invalid request", { status: 400 });
  }

  await UserService.updateUser({
    clerkUserId,
    data: {
      online: status === "online",
      lastActive: status === "offline" ? lastActive : new Date(),
    },
  });

  return new Response("User status updated", { status: 200 });
}
