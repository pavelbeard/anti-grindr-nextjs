import prisma from "@/lib/prisma";

export const createChat = async (userA: string, userB: string) => {
  return await prisma.chat.create({
    data: {
      members: {
        create: [
          {
            userId: userA,
          },
          {
            userId: userB,
          },
        ],
      },
    },
  });
};

export const createMessage = async (data: {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  createdAt?: Date;
}) => {
  const { id, chatId, userId, text, createdAt } = data;

  await prisma.message.create({
    data: {
      id,
      chatId,
      userId,
      text,
      createdAt,
    },
  });
};

// CHANGED
export const getChatsForUser = async (userId: string) => {
  return await prisma.chat.findMany({
    where: {
      members: {
        some: {
          user: {
            clerkUserId: userId,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            include: {
              Profile: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
};

// CHANGED
export const getPrivateChat = async (userA: string, userB: string) => {
  return await prisma.chat.findMany({
    where: {
      members: {
        some: { userId: userA },
      },
      AND: {
        members: {
          some: { userId: userB },
        },
      },
    },
    include: {
      members: true,
    },
  });
};

export const getMessagesByChatId = async ({
  chatId,
  limit = 20,
  offset = 0,
}: {
  chatId: string;
  limit?: number;
  offset?: number;
}) => {
  const msg = await prisma.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: offset,
    include: {
      User: true,
    },
  });
  return msg.reverse();
};
