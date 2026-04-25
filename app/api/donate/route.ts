import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      needId,      // ⭐ MUST be included
      amount,
      donorName,
      donorEmail,
      message,
      story,
      template,
      photoUrl,
      slug,
    } = body;

    if (!needId) {
      return NextResponse.json(
        { error: "needId is required." },
        { status: 400 }
      );
    }

    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { error: "Amount is required and must be a number." },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        needId,      // ⭐ REQUIRED
        amount,
        donorName,
        donorEmail,
        message,
        story,
        template,
        photoUrl,
        slug: slug || null,
      },
    });

    return NextResponse.json(
      { success: true, donation },
      { status: 200 }
    );
  } catch (error) {
    console.error("Donation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}