import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";

export async function POST(req, { params }) {
  const donationId = params.id;

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const filepath = `public/uploads/${filename}`;

  await writeFile(filepath, buffer);

  const photo = await prisma.photo.create({
    data: {
      url: `/uploads/${filename}`,
      donationId,
    },
  });

  return NextResponse.json(photo);
}