import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    const {
      title,
      category,
      description,
      tags,
      city,
      state,
      zip,
    } = body;

    const userId = "anonymous-user";

    const need = await prisma.need.create({
      data: {
        title,
        category,
        description: description || null,
        tags: tags || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        userId,
      },
    });

    return NextResponse.json({ ok: true, id: need.id });
  } catch (err) {
    console.error("Request Help Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}