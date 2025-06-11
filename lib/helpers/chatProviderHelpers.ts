"use server";

import { Chat } from "@/app/generated/prisma";
import * as ChatFeatures from "@/lib/features/chat.features";
import * as UserFeatures from "@/lib/features/user.features";
import { AppError } from "./appError";

interface ChatFromDb extends Chat {
  members?: Awaited<ReturnType<typeof ChatFeatures.getChat>>["members"];
}

export interface OpenChat {
  chatId?: string; // Added chatId to uniquely identify the chat
  userIdSender: string;
  userIdReceiver: string;
  expanded: boolean;
  lastActive: Date; // to track last active time
  members?: Awaited<ReturnType<typeof ChatFeatures.getChat>>["members"]; // Optional, if you want to include members in the OpenChat
}

interface OpenNewChatParams {
  currentChats: OpenChat[];
  userIdSender: string;
  withNewUserId: string;
}

interface AssignChatIdParams {
  currentChats: OpenChat[];
  userIdReceiver: string;
}

export const getOrCreateChat = async (
  withNewUserId: string
): Promise<ChatFromDb | null> => {
  let chatFromDb: ChatFromDb | null = null;
  // the chat from database

  try {
    chatFromDb = await ChatFeatures.getChat(withNewUserId);
  } catch (error) {
    if (error instanceof AppError) {
      if (error.statusCode === 404) {
        // create a new chat if it does not exist
        chatFromDb = await ChatFeatures.createChat(withNewUserId);
      }
    } else {
      throw new AppError("SERVER", `${error}`);
    }
  }

  return chatFromDb;
};

const expandControl = (chats: OpenChat[]) => {
  // Ensure lastActive is always a Date object
  const newChats = chats.map((chat) => ({
    ...chat,
    // Convert lastActive to Date if it's not already
    lastActive:
      chat.lastActive instanceof Date
        ? chat.lastActive
        : new Date(chat.lastActive),
  }));

  if (newChats.filter((chat) => chat.expanded).length > 2) {
    // extract expanded chats
    const expandedChats = newChats.filter((chat) => chat.expanded);
    // sort expanded chats by last active time
    expandedChats.sort(
      (a, b) => b.lastActive.getTime() - a.lastActive.getTime()
    );

    // Collapse all but the most recent expanded chat
    expandedChats.forEach((chat, index) => {
      if (chat.expanded && index > 1) {
        chat.expanded = false;
      }
    });

    // merge back the expanded chats into newChats
    newChats.forEach((chat) => {
      const expandedChat = expandedChats.find(
        (expanded) => expanded.userIdReceiver === chat.userIdReceiver
      );
      if (expandedChat) {
        chat.expanded = expandedChat.expanded;
      }
    });

    // Sort the newChats by last active time
    newChats.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime());
  }

  return newChats;
};

// Until 10 open chats and 2 active chats, then remove the oldest one
export const openNewChat = async ({
  currentChats,
  userIdSender,
  withNewUserId,
}: OpenNewChatParams) => {
  const chats = [...currentChats];
  // Check if the chat with the new user already exists

  let newChats;

  if (chats.some((chat) => chat.userIdReceiver === withNewUserId)) {
    // If the chat already exists, update its last active time and expand it
    newChats = chats.map((chat) => {
      if (chat.userIdReceiver === withNewUserId) {
        return { ...chat, expanded: true, lastActive: new Date() };
      }
      return chat;
    });
  } else {
    // If the chat does not exist, create a new one
    newChats = [
      ...chats,
      {
        userIdSender: userIdSender,
        userIdReceiver: withNewUserId,
        expanded: true,
        lastActive: new Date(),
      },
    ];
  }

  if (newChats.length > 10) {
    // Remove the oldest chat (first in the array)
    newChats.shift();
  }

  return expandControl(newChats);
};

export const closeChat = async (
  currentChats: OpenChat[],
  withUserId: string
): Promise<OpenChat[]> => {
  return currentChats.filter((chat) => chat.userIdReceiver !== withUserId);
};

export const toggleChatExpansion = async (
  currentChats: OpenChat[],
  withUserId: string
): Promise<OpenChat[]> => {
  return expandControl(
    currentChats.map((chat) => {
      if (chat.userIdReceiver === withUserId) {
        return {
          ...chat,
          expanded: !chat.expanded,
          lastActive: new Date(),
        };
      }
      return chat;
    })
  );
};

export const assignChatIdToOpenChat = async ({
  currentChats,
  userIdReceiver,
}: AssignChatIdParams): Promise<OpenChat[]> => {
  // it lasts to create a chat window
  const chatFromDb = await getOrCreateChat(userIdReceiver);

  return currentChats.map((chat) => {
    if (chat.userIdReceiver === userIdReceiver) {
      return { ...chat, chatId: chatFromDb?.id, members: chatFromDb?.members };
    }
    return chat;
  });
};

export const getMemberProfile = async (withUserId: string) => {
  const profile = await UserFeatures.getMemberProfileInfo(withUserId);
  return profile;
};
