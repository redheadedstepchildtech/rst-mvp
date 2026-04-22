import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const existing = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existing) {
    await prisma.user.create({
      data: { id: userId },
    });
  }

  return NextResponse.json({ ok: true });
}