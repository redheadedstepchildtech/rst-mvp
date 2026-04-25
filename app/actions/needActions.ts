"use server";

import { prisma } from "@/lib/prisma";

export async function addBoost(
  needId: string,
  type: "urgency" | "visibility" | "dignity"
) {
  // Log boost history
  await prisma.boostHistory.create({
    data: {
      needId,
      type,
    },
  });

  // Increment counters
  const field =
    type === "urgency"
      ? "urgencyBoost"
      : type === "visibility"
      ? "visibilityBoost"
      : "dignityBoost";

  await prisma.need.update({
    where: { id: needId },
    data: { [field]: { increment: 1 } },
  });

  return { success: true };
}