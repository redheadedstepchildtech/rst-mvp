import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    const hashed = await bcrypt.hash(password, 10);

    await prisma.partner.create({
      data: { name, email, password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create partner account" },
      { status: 500 }
    );
  }
}