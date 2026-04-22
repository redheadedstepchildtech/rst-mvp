import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return;
  }

  // Allow login page
  if (pathname === "/admin/login") {
    return;
  }

  const session = req.cookies.get("admin_session");

  // Redirect if no session
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return;
}

export const config = {
  matcher: ["/admin/:path*"],
};