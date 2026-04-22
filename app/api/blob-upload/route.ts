import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `donation-${Date.now()}.jpg`;

    // Save to /public/uploads
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(filePath, buffer);

    // Public URL
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Upload failed" },
      { status: 500 }
    );
  }
}