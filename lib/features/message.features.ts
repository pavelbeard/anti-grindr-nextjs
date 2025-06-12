import * as ChatService from "@/lib/data/chat/chat.service";
import { auth } from "@clerk/nextjs/server";
import { PAGE_SIZE } from "../constants";
import { AppError } from "../helpers/appError";

interface CreateMessage {
  id: string;
  chatId: string;
  text: string;
  createdAt?: Date;
}

export async function createMessage({
  id,
  chatId,
  text,
  createdAt,
}: CreateMessage) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!chatId || !text) {
    throw new AppError("BAD_REQUEST", "Chat ID and text are required");
  }

  return await ChatService.createMessage({
    id,
    chatId,
    userId,
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
