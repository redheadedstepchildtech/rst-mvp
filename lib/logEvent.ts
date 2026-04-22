import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function logEvent(requestId: string, type: string, message: string) {
  await prisma.requestEvent.create({
    data: {
      requestId,
      type,
      message,
    },
  });
}