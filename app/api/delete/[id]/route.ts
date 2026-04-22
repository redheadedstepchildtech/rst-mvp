import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await prisma.donation.delete({
      where: { id },
    });

    return NextResponse.redirect("/dashboard");
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}