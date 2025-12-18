import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  process.env.DATABASE_URL === undefined
    ? undefined
    : globalForPrisma.prisma ?? new PrismaClient();

if (prisma && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type { PrismaClient } from "@/generated/prisma";
