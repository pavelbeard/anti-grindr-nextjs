import * as UserService from "@/lib/api/user/user.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const users = await UserService.getMembers(userId);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
