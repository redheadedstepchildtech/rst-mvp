import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, greeting } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const profile = await prisma.profile.create({
    data: {
      name,
      greeting: greeting || "",
    },
  });

  return NextResponse.json({
    profileId: profile.id,
  });
}