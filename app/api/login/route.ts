import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("session", "active", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return NextResponse.json({ success: true });
}