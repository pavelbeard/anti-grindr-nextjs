import * as UserService from "@/lib/api/user/user.service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response("userId is required", { status: 400 });
  }

  const body = await request.json();
  const { latitude, longitude } = body;

  if (!latitude || !longitude) {
    return new Response("Invalid data", { status: 400 });
  }

  const location = await UserService.createUserLocation({
    userId,
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
