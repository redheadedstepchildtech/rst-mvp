import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}