import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from "next/server";

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

    import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

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

    // Upload to Vercel Blob
    const blob = await put(`uploads/${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

    return NextResponse.json({
      success: true,
      url: fakeUrl,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}

import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeImageSafety(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

async function describeImage(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "input_image", image: buffer },
          { type: "text", text: "Describe this image in one sentence." }
        ]
      }
    ]
  });

  return response.choices[0].message.content;
}

const safety = await analyzeImageSafety(file);

if (safety.results[0].flagged) {
  return NextResponse.json(
    { error: "This image violates safety guidelines." },
    { status: 400 }
  );
}

  const response = await client.moderations.create({
    model: "omni-moderation-latest",
    input: buffer,
  });

  return response;
}