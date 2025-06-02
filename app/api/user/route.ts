import * as UserService from "@/lib/data/user/user.service";
import { auth } from "@clerk/nextjs/server";

// CHANGED
export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await UserService.getUserById(userId);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify({ userId: user.clerkUserId }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
