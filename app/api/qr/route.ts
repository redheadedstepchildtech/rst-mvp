import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const qrPng = await QRCode.toBuffer(url, {
      type: "png",
      width: 300,
      margin: 2,
    });

    return new NextResponse(qrPng, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("QR generation error:", err);
    return NextResponse.json({ error: "QR generation failed" }, { status: 500 });
  }
}