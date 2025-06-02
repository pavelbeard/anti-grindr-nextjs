import { DOBSchema } from "@/lib/data/user/profile.schemas";
import * as ProfileService from "@/lib/data/user/profile.service";
import { auth } from "@clerk/nextjs/server";

// CHANGED
export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile) {
    return new Response("Profile not found", { status: 404 });
  }

  return new Response(JSON.stringify(profile), { status: 200 });
}

// CHANGED
export async function POST(request: Request) {
  const { userId } = await auth();
  const { day, month, year } = await request.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

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

  if (await ProfileService.getProfileByUserId(userId)) {
    return new Response("Profile already exists", { status: 400 });
  }

  const user_data = {
    user: {
      connect: { clerkUserId: userId },
    },
    date_of_birth,
  };

  await ProfileService.createProfile(user_data);

  return new Response("Profile created", { status: 201 });
}

// CHANGED
export async function PATCH(request: Request) {
  const { userId } = await auth();
  const data = await request.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile) {
    return new Response("Profile not found", { status: 404 });
  }

  await ProfileService.updateProfile({
    profileId: profile.id,
    data,
  });

  return new Response("Profile updated", { status: 200 });
}
