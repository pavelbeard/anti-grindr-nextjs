import { PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";

export const getMessagesForChat = async ({
  chatId,
  offset = 0,
  limit = PAGE_SIZE,
}: {
  chatId: string;
  offset?: number;
  limit?: number;
}) => {
  const messages = await prisma.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
    skip: offset,
    take: limit,
  });
  return messages;
};
