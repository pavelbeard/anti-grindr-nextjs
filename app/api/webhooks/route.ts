import * as UserApp from "@/app/lib/services/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id: clerkUserId } = evt.data;

    if (!clerkUserId) {
      return new Response("No User ID provided", { status: 400 });
    }

    let user = null;
    // Fetch the user from your database using the clerkUserId

    if (evt.type === "user.created") {
      user = await UserApp.createUser(clerkUserId);
    } else if (evt.type === "user.deleted") {
      await UserApp.deleteUser(clerkUserId);
      return new Response(null, { status: 204 });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Server error", { status: 500 });
  }
}
