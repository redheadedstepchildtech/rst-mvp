import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Generate a short 4-character slug
function generateSlug() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < 4; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

export async function POST(req: Request) {
  try {
    const { name, email, category, message } = await req.json();

    if (!name || !email || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique slug
    let slug = generateSlug();

    // Ensure slug is unique
    let exists = await prisma.monetaryDonation.findUnique({ where: { slug } });
    while (exists) {
      slug = generateSlug();
      exists = await prisma.monetaryDonation.findUnique({ where: { slug } });
    }

    const donation = await prisma.monetaryDonation.create({
      data: {
        name,
        email,
        category,
        message: message || "",
        slug,
      },
    });

    return NextResponse.json({
      success: true,
      donation: { id: donation.slug },
    });

  } catch (err) {
    console.error("Error creating monetary donation:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
