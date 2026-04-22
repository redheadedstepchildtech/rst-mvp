import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("session", "guest", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return NextResponse.json({ success: true });
}