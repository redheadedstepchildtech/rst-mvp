import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // In the future, you’ll validate username/password here.
  // For now, we just set the session cookie.

  cookies().set("session", "active", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return NextResponse.json({ success: true });
}