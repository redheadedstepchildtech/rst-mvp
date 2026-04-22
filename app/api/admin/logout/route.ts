import { NextResponse } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("admin_session");
  return NextResponse.redirect("/admin/login");
}

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}