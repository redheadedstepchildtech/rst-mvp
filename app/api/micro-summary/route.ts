import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    micro: "Micro-summary endpoint is temporarily disabled while we finalize deployment.",
  });
}