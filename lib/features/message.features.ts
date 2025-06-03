import * as ChatService from "@/lib/data/chat/chat.service";
import { PAGE_SIZE } from "../constants";
import { AppError } from "../helpers/appError";

export async function fetchMessages({
  chatId,
  offset = 0,
  limit = PAGE_SIZE,
}: {
  chatId: string;
  offset?: number;
  limit?: number;
}) {
  if (!chatId) {
    throw new AppError("BAD_REQUEST", "Chat ID is required");
  }

  return await ChatService.getMessagesByChatId({
    chatId,
    offset,
    limit,
  });
}
