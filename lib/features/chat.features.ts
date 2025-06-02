import * as ChatService from "@/lib/data/member/chat/chat.service";
import { AppError } from "@/lib/helpers/appError";
import { auth } from "@clerk/nextjs/server";

export async function getChat(userB: string | null) {
  const { userId: userA } = await auth();

  if (!userA) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!userB) {
    throw new AppError("BAD_REQUEST", "Missing userB");
  }

  const chat = (await ChatService.getPrivateChat(userA, userB)).find(
    (c) =>
      c.members.length === 2 &&
      c.members.some((m) => m.userId === userA) &&
      c.members.some((m) => m.userId === userB)
  );

  if (!chat) {
    throw new AppError("NOT_FOUND", "Chat not found");
  }

  return { chatId: chat.id };
}

export async function getChatsForCurrentUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const chats = await ChatService.getChatsForUser(userId);

  return chats;
}

export async function createChat(userB: string | null) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!userB) {
    throw new AppError("BAD_REQUEST", "Missing userB");
  }

  const createdChat = await ChatService.createChat(userId, userB);
  // Implementation for creating a chat
  if (!createdChat) {
    throw new AppError("BAD_REQUEST", "Failed to create chat");
  }

  return createdChat;
}
