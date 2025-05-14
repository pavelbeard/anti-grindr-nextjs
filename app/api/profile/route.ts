import * as ProfileApp from "@/lib/services/profile";
import { getUserByClerkId } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId: clerkUserId } = await auth();
  const { date_of_birth } = await request.json();

  if (!clerkUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await getUserByClerkId(clerkUserId);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (await ProfileApp.getProfileByUserId(user.id)) {
    return new Response("Profile already exists", { status: 409 });
  }

  const user_data = {
    user: {
      connect: { id: user.id },
    },
    date_of_birth,
  };

  await ProfileApp.createProfile(user_data);

  return new Response("Profile created", { status: 201 });
}
