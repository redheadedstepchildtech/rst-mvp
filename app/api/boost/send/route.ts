import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const prisma = new PrismaClient();

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

export async function POST() {
  try {
    // 1. Get all pending boosts
    const pending = await prisma.boostQueue.findMany({
      where: { sent: false },
      include: { need: true },
    });

    if (pending.length === 0) {
      return NextResponse.json({ message: "No pending boosts" });
    }

    // 2. Get all helpers
    const helpers = await prisma.helper.findMany();

    // 3. Send SMS for each pending boost
    for (const boost of pending) {
      const need = boost.need;

      for (const helper of helpers) {
        await client.messages.create({
          body: `New boosted post: ${need.title}\n${process.env.BASE_URL}/rst/needs/${need.id}`,
          from: process.env.TWILIO_NUMBER,
          to: helper.phone,
        });
      }

      // 4. Mark boost as sent
      await prisma.boostQueue.update({
        where: { id: boost.id },
        data: { sent: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Boost send error:", error);
    return NextResponse.json(
      { error: "Failed to send boosts" },
      { status: 500 }
    );
  }
}