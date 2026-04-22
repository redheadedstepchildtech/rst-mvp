import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { needId, userId } = await req.json();

    if (!needId || !userId) {
      return NextResponse.json(
        { error: "Missing needId or userId" },
        { status: 400 }
      );
    }

    // Fetch user credits
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { boostCredits: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.boostCredits <= 0) {
      return NextResponse.json(
        { error: "No boost credits available." },
        { status: 403 }
      );
    }

    // Create boost entry
    await prisma.boostQueue.create({
      data: { needId },
    });

    // Decrement credit
    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        boostCredits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Boost applied using credit.",
    });
  } catch (error) {
    console.error("Boost credit error:", error);
    return NextResponse.json(
      { error: "Failed to apply boost using credit." },
      { status: 500 }
    );
  }
}