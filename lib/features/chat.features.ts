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

export async function getChatsForCurrentUser({
  offset = 0,
  limit = 30,
}: {
  offset?: number;
  limit?: number;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const chats = await ChatService.getChatsForUser({ userId, offset, limit });

  // Convert chats to the desired structure: [{ message: { id, text, from } }, ...]
  const formattedChats = chats
    .map((chat) => ({
      chatId: chat.id,
      message: {
        id: chat.messages.slice(-1)[0]?.id,
        text: chat.messages.find((msg) => msg.userId !== userId)?.text,
        from: chat.members.find((member) => member.userId !== userId)?.userId,
      },
      fromUserId: chat.members.find((member) => member.userId !== userId)
        ?.userId,
      fromName: chat.members.find((member) => member.userId !== userId)?.user
        .Profile?.name,
      fromAvatar: chat.members.find((member) => member.userId !== userId)?.user
        .Profile?.avatar,
      isUserOnline: chat.members.find((member) => member.userId !== userId)
        ?.user.online,
    }))
    .filter(
      (chat) => chat.message.id && chat.message.text && chat.message.from
    );

  return formattedChats;
}
