import { NextResponse, cookies } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("session", "guest", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return NextResponse.json({ success: true });
}