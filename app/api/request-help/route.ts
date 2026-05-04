import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Required fields
    if (!body.title || !body.category || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TEMP USER (until auth is added)
    const userId = body.userId || "anonymous-user";

    // Create the Need record
    const need = await prisma.need.create({
      data: {
        title: body.title,
        category: body.category,
        description: body.description,
        tags: body.tags || "",
        city: body.city || "",
        state: body.state || "",
        zip: body.zip || "",
        photoUrl: body.photoUrl || null,
        theme: body.theme || null,
        microSummary: body.microSummary || null,
        microPlacement: body.microPlacement || null,
        microSize: body.microSize || null,
        userId: userId,
      },
    });

    console.log("New Need Created:", need.id);

    return NextResponse.json({ ok: true, id: need.id });
  } catch (err) {
    console.error("Request Help Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}