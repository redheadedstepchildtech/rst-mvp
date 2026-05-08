import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const saved = await prisma.donation.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        itemName: data.itemName,
        condition: data.condition,
        description: data.description,
      },
    });

    return NextResponse.json({ success: true, saved });
  } catch (err) {
    console.error("Donate Item Error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}