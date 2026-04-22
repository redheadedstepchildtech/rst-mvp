import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

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