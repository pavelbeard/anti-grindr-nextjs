import { DOBSchema } from "@/lib/api/profile/profile.schemas";
import * as ProfileApp from "@/lib/api/profile/profile.service";
import { getUserByClerkId } from "@/lib/api/user/user.service";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId: clerkUserId } = await auth();
  const { day, month, year } = await request.json();

  const validatedData = DOBSchema.safeParse({ day, month, year });
  if (!validatedData.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid date of birth",
      }),
      {
        status: 400,
      }
    );
  }
  const {
    day: validatedDay,
    month: validatedMonth,
    year: validatedYear,
  } = validatedData.data;

  const date_of_birth = new Date(
    Date.parse(`${validatedYear}-${validatedMonth}-${validatedDay}`)
  );

  if (!clerkUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await getUserByClerkId(clerkUserId);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (await ProfileApp.getProfileByUserId(user.id)) {
    return new Response("Profile already exists", { status: 400 });
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
