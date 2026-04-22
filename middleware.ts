import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function middleware(req) {
  const userId = req.cookies.get("rst_user")?.value;

  // If no user cookie and trying to access admin routes → redirect to login
  if (!userId) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Look up the user
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin + Moderator allowed
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (user.role !== "admin" && user.role !== "moderator") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
