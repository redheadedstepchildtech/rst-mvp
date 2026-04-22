import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const needId = Number(session.metadata?.needId);

    if (needId) {
      await prisma.boostQueue.create({
        data: { needId },
      });
    }
  }
if (session.metadata?.type === "boost_pack") {
  const userId = Number(session.metadata.userId);

  await prisma.user.update({
    where: { id: userId },
    data: {
      boostCredits: {
        increment: 4, // ⭐ Add 4 credits
      },
    },
  });
}

  return new NextResponse("OK", { status: 200 });
}