"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function reportPhoto(formData: FormData) {
  const needId = formData.get("needId") as string;
  const reason = formData.get("reason") as string;
  const notes = formData.get("notes") as string;

  await prisma.reportedPhoto.create({
    data: {
      needId,
      reason,
      notes,
    },
  });

  redirect(`/rst/needs/${needId}`);
}