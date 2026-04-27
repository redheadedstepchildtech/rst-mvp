import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  const {
    amount,
    donorName,
    donorEmail,
    message,
    story,
    template,
    photoUrl,
  } = body;

  try {
    await prisma.donation.update({
      where: { id },
      data: {
        amount,
        donorName,
        donorEmail,
        message,
        story,
        template,
        photoUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}