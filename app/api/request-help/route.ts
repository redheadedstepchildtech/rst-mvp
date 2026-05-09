import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      category,
      description,
      tags,
      city,
      state,
      zip,
    } = body;

    // TEMP USER (until auth is added)
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