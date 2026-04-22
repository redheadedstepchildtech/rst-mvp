import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
  const { photoId } = params;

  await prisma.photo.delete({
    where: { id: photoId },
  });

  return NextResponse.json({ success: true });
}