import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const fileName = `${Date.now()}-${file.name