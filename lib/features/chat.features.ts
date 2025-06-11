"use server";

import * as ChatService from "@/lib/data/chat/chat.service";
import { AppError } from "@/lib/helpers/appError";
import { auth } from "@clerk/nextjs/server";

export async function createChat(withUserId: string | null) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!withUserId) {
    throw new AppError("BAD_REQUEST", "Missing userB");
  }

  const createdChat = await ChatService.createChat(userId, withUserId);
  // Implementation for creating a chat
  if (!createdChat) {
    throw new AppError("BAD_REQUEST", "Failed to create chat");
  }

  return createdChat;
}

export async function getChat(withUserId: string | null) {
  const { userId: userA } = await auth();

  if (!userA) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!withUserId) {
    throw new AppError("BAD_REQUEST", "Missing withUserId");
  }

  const chat = (await ChatService.getPrivateChat(userA, withUserId)).find(
    (c) =>
      c.members.length === 2 &&
      c.members.some((m) => m.userId === userA) &&
      c.members.some((m) => m.userId === withUserId)
  );

  if (!chat) {
    throw new AppError("NOT_FOUND", "Chat not found");
  }

  return chat;
}

export async function getChatsForCurrentUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const chats = await ChatService.getChatsForUser(userId);

  return chats;
}
