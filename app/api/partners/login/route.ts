import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const form = await req.formData();

    const email = form.get("email");
    const password = form.get("password");

    const partner = await prisma.partner.findUnique({
      where: { email },
    });

    if (!partner) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, partner.password);

    if (!valid) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    // Simple session cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set("partnerId", partner.id, { path: "/" });

    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}