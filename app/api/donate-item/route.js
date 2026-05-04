export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userId = body.userId || "anonymous-user";

    const need = await prisma.need.create({
      data: {
        title: body.title,
        category: "donation",
        description: body.description,
        city: body.city || "",
        state: body.state || "",
        zip: body.zip || "",
        userId: userId,
      },
    });

    const donation = await prisma.donation.create({
      data: {
        needId: need.id,
        donorName: body.donorName || null,
        donorEmail: body.donorEmail || null,
        message: body.message || null,
      },
    });

    console.log("New Donation Created:", donation.id);

    return NextResponse.json({
      ok: true,
      needId: need.id,
      donationId: donation.id,
    });

  } catch (err) {
    console.error("Donate Item Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}