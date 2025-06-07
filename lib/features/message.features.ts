import * as ChatService from "@/lib/data/chat/chat.service";
import { auth } from "@clerk/nextjs/server";
import { PAGE_SIZE } from "../constants";
import { AppError } from "../helpers/appError";

interface CreateMessage {
  chatId: string;
  toUserId: string | null;
  text: string;
  createdAt?: Date;
}

export async function createMessage({
  chatId,
  toUserId,
  text,
  createdAt,
}: CreateMessage) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!chatId || !toUserId || !text) {
    throw new AppError(
      "BAD_REQUEST",
      "Chat ID, User ID, and text are required"
    );
  }

  return await ChatService.createMessage({
    chatId,
    userId: toUserId,
    text,
    createdAt,
  });
}

export async function fetchMessages({
  chatId,
  offset = 0,
  limit = PAGE_SIZE,
}: {
  chatId: string;
  offset?: number;
  limit?: number;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!chatId) {
    throw new AppError("BAD_REQUEST", "Chat ID is required");
  }

  return await ChatService.getMessagesByChatId({
    chatId,
    offset,
    limit,
  });
}
