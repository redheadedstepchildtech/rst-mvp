import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_BOOST_PACK,
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/rst/boost-pack/success`,
      cancel_url: `${process.env.BASE_URL}/rst/boost-pack/cancel`,
      metadata: {
        userId: String(userId),
        type: "boost_pack",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Boost pack checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}