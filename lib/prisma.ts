import { PrismaClient } from "@/app/generated/prisma/client";

// Prevent multiple instances of PrismaClient in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.VERCEL_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
