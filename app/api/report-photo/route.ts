import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { needId, photoUrl, reason, notes } = await req.json();

  if (!needId || !photoUrl) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await prisma.reportedPhoto.create({
    data: {
      needId,
      photoUrl,
      reason,
      notes,
    },
  });

  return NextResponse.json({ success: true });
}