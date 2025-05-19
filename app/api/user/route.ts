import * as UserService from "@/lib/api/user/user.service";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await UserService.getUserByClerkId(clerkUserId);

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
