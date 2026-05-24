import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {

    // ... your existing code ...

    const { slug, amount } = await req.json();

    if (!slug || !amount) {
      return NextResponse.json(
        { error: "Missing slug or amount." },
        { status: 400 }
      );
    }

    const donation = await prisma.monetaryDonation.findUnique({
      where: { slug },
    });

    if (!donation) {
      return NextResponse.json(
        { error: "Donation request not found." },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Donation for ${donation.name}`,
            },
            unit_amount: Math.round(amount * 100), // dollars → cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/${slug}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/${slug}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
