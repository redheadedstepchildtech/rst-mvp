import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      category: String(form.get("category") || ""),
      details: String(form.get("details") || ""),
      location: String(form.get("location") || ""),
    };

    if (!data.name || !data.details || !data.location) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (data.email) {
      const recent = await prisma.publicRequest.findFirst({
        where: {
          email: data.email,
          createdAt: {
            gte: new Date(Date.now() - 1000 * 60 * 5),
          },
        },
      });

      if (recent) {
        return NextResponse.json(
          { error: "Please wait before submitting another request." },
          { status: 429 }
        );
      }
    }

    await prisma.publicRequest.create({ data });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}