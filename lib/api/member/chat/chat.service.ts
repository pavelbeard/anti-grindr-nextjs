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
  chatId: string;
  userId: string;
  text: string;
}) => {
  const { chatId, userId, text } = data;

  await prisma.message.create({
    data: {
      chatId,
      userId,
      text,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastActive: new Date(),
    },
  });
};

export const getChatsForUser = async (userId: string) => {
  return await prisma.chat.findMany({
    where: {
      members: {
        some: {
          userId,
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

export const getMessagesByChatId = async (
  chatId: string,
  limit: number = 20,
  offset: number = 0
) => {
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
      User: {
        include: {
          Profile: true,
        },
      },
    },
  });
  return msg.reverse();
};
