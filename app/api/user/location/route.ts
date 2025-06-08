import * as UserService from "@/lib/data/user/user.service";
import { auth } from "@clerk/nextjs/server";

// CHANGED
export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { latitude, longitude } = body;

  if (!latitude || !longitude) {
    return new Response("Invalid data", { status: 400 });
  }

  const location = await UserService.createUserLocation({
    clerkUserId: userId,
    latitude,
    longitude,
  });

  return new Response(JSON.stringify(location), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
