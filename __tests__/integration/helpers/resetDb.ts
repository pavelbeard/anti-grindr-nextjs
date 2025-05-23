import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction(async (tx) => {
    await tx.message.deleteMany();
    await tx.chat.deleteMany();
    await tx.user.deleteMany();
    await tx.gender.deleteMany();
    await tx.pronoun.deleteMany();
  });
};
