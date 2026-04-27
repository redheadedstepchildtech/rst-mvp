import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = form.get("name");
    const email = form.get("email");
    const category = form.get("category");

    await prisma.alertSubscriber.create({
      data: { name, email, category },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}