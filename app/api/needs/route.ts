import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import { sendEmail } from "@/lib/email";
import { sendSMS } from "@/lib/sms";

export async function POST(req: Request) {
  const formData = await req.formData();

  // Required
  const type = String(formData.get("type") || "story");
  const title = String(formData.get("title") || "");
  const userId = "demo-user"; // Replace with real auth later

  // Optional fields
  const category = String(formData.get("category") || "");
  const description = String(formData.get("description") || "");
  const tags = String(formData.get("tags") || "");
  const needs = String(formData.get("needs") || "");

  const city = String(formData.get("city") || "");
  const state = String(formData.get("state") || "");
  const zip = String(formData.get("zip") || "");

  const theme = String(formData.get("theme") || "");
  const microSummary = String(formData.get("microSummary") || "");
  const microPlacement = String(formData.get("microPlacement") || "");
  const microSize = String(formData.get("microSize") || "");

  // Photo upload
  const file = formData.get("photo") as File | null;
  let photoUrl = "";

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const id = crypto.randomUUID();
    const uploadPath = path.join(process.cwd(), "public", "uploads", `${id}.jpg`);
    await fs.writeFile(uploadPath, buffer);
    photoUrl = `/uploads/${id}.jpg`;
  }

  // QR code
  const idForQR = crypto.randomUUID();
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/need/${idForQR}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=2000x2000&data=${encodeURIComponent(pageUrl)}`;

  // Create Need in Prisma
  const need = await prisma.need.create({
    data: {
      id: idForQR,
      type,
      title,
      category,
      description,
      tags,
      needs,
      city,
      state,
      zip,
      photoUrl,
      qrUrl,
      theme,
      microSummary,
      microPlacement,
      microSize,
      userId,
    },
  });

  // EMAIL
  await sendEmail(
    "admin@rst.local",
    "New Need Created",
    `<h1>${need.title}</h1><p>${need.description}</p>`
  );

  // OPTIONAL SMS
  await sendSMS(
    "+1406YOURNUMBER",
    `New Need Created: ${need.title}`
  );

  return NextResponse.json({ id: need.id });
}
