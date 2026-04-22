import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { needId, userId } = await req.json();

    if (!needId || !userId) {
      return NextResponse.json(
        { error: "Missing needId or userId" },
        { status: 400 }
      );
    }

    // ⭐ 1. Check if user has boost credits
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

    if (user.boostCredits > 0) {
      // ⭐ Use a credit: skip Stripe, skip 30-day rule
      await prisma.boostQueue.create({
        data: { needId },
      });

      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          boostCredits: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json(
        {
          success: true,
          usedCredit: true,
          message: "Boost applied using your boost credits.",
        },
        { status: 200 }
      );
    }

    // ⭐ 2. No credits: enforce 30-day rule, then Stripe

    // Check last boost timestamp
    const lastBoost = await prisma.boostQueue.findFirst({
      where: { needId },
      orderBy: { createdAt: "desc" },
    });

    if (lastBoost) {
      const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
      const now = Date.now();
      const last = new Date(lastBoost.createdAt).getTime();

      if (now - last < THIRTY_DAYS) {
        const nextBoostDate = new Date(last + THIRTY_DAYS)
          .toISOString()
          .split("T")[0];

        return NextResponse.json(
          {
            error: `This post was already boosted recently. You can boost again on ${nextBoostDate}.`,
            nextBoostDate,
          },
          { status: 403 }
        );
      }
    }

    // ⭐ 3. Create Stripe Checkout session for single $5 boost
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_BOOST,
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/rst/needs/${needId}?boost=success`,
      cancel_url: `${process.env.BASE_URL}/rst/needs/${needId}?boost=cancel`,
      metadata: {
        needId: String(needId),
        userId: String(userId),
        type: "single_boost",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}