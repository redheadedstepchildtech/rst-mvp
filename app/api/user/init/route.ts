import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // RST 1.0 does not use this route.
  // User initialization will be implemented in RST 2.0.
  return NextResponse.json({
    ok: true,
    message: "User init disabled until RST 2.0",
  });
}