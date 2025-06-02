import * as UserFeatures from "@/lib/features/user.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";
import { NextResponse } from "next/server";

// CHANGED
export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json();
  await UserFeatures.changeStatus(body.status);
  return NextResponse.json(
    { message: "Status updated successfully" },
    { status: 200 }
  );
});
