import * as ProfileService from "@/lib/api/user/profile/profile.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response("User id is required", { status: 400 });
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile) {
    return new Response("Profile not found", { status: 404 });
  }

  return new Response(JSON.stringify(profile), { status: 200 });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
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

  if (!userId) {
    return new Response("User id is required", { status: 400 });
  }

  if (await ProfileService.getProfileByUserId(userId)) {
    return new Response("Profile already exists", { status: 400 });
  }

  const user_data = {
    user: {
      connect: { id: userId },
    },
    date_of_birth,
  };

  await ProfileService.createProfile(user_data);

  return new Response("Profile created", { status: 201 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
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
