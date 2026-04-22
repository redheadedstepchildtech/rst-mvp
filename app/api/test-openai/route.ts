import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.OPENAI_API_KEY;

  return NextResponse.json({
    loaded: !!key,
    prefix: key ? key.slice(0, 6) : null,
    length: key ? key.length : 0,
  });
}