import * as UserApp from "@/lib/api/user/user.service";
import { WebhookEvent } from "@clerk/nextjs/webhooks";
import { headers } from "next/headers";
import { Webhook } from "svix";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ``;

async function verifyRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  try {
    const evt = await verifyRequest(request);
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

    return new Response("Ok", { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Server error", { status: 500 });
  }
}
