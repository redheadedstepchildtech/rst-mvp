import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { profileId, amountDollars } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(parseFloat(amountDollars) * 100),
          product_data: {
            name: `Donation`,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.FRONTEND_URL}/donation/${profileId}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/donation/${profileId}?cancelled=true`,
  });

  return NextResponse.json({ url: session.url });
}
