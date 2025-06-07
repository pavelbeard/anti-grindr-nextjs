import * as MessageFeatures from "@/lib/features/message.features";
import { withErrorHandler } from "@/lib/helpers/errorAPIHandler";
import { NextResponse } from "next/server";

type Params = {
  chatId: string;
};

export const POST = withErrorHandler(
  async (req: Request, { params }: { params: Promise<Params> }) => {
    const { chatId } = await params;
    const { searchParams } = new URL(req.url);
    const toUserId = searchParams.get("toUserId");
    const { text, createdAt } = await req.json().then((data) => data);

    await MessageFeatures.createMessage({
      chatId,
      toUserId,
      text,
      createdAt,
    });

    return NextResponse.json({ status: 200 });
  }
);

export const GET = withErrorHandler(
  async (req: Request, { params }: { params: Promise<Params> }) => {
    const { chatId } = await params;
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get("offset") || "0", 0);
    const limit = parseInt(searchParams.get("limit") || "20", 0);

    const messages = await MessageFeatures.fetchMessages({
      chatId,
      offset,
      limit,
    });

    return new Response(JSON.stringify(messages), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);
