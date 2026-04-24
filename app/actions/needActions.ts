"use server";

import { prisma } from "@/lib/prisma";

export async function addBoost(
  needId: string,
  type: "urgency" | "visibility" | "dignity"
) {
  // Create boost record
  await prisma.boost.create({
    data: {
      needId,
      type,
    },
  });

  // Increment the appropriate boost counter
  if (type === "urgency") {
    await prisma.need.update({
      where: { id: needId },
      data: { urgencyBoost: { increment: 1 } },
    });
  }

  if (type === "visibility") {
    await prisma.need.update({
      where: { id: needId },
      data: { visibilityBoost: { increment: 1 } },
    });
  }

  if (type === "dignity") {
    await prisma.need.update({
      where: { id: needId },
      data: { dignityBoost: { increment: 1 } },
    });
  }

  return { success: true };
}