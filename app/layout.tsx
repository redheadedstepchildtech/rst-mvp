"use client";

import "./globals.css";
import "./themes.css";
import { Dancing_Script } from "next/font/google";
import GlobalSearch from "@/components/GlobalSearch";
import { usePathname } from "next/navigation";

const dancing = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${dancing.className}`}>

        {/* HEADER — Hidden on Homepage */}
        {!isHome && (
          <header className="p-4 bg-white shadow flex items-center justify-between">
            <div className="max-w-5xl mx-auto flex items-center gap-3">
              <GlobalSearch />
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs">
                Beta
              </span>
            </div>
          </header>
        )}

        {/* NAVIGATION — Hidden on Homepage */}
        {!isHome && (
          <nav className="flex gap-4 text-sm p-4 bg-gray-50 border-b">
            {/* These will later move to Donations In‑Kind */}
            <a href="/request-help" className="hover:underline">Request Help</a>
            <a href="/donate-item" className="hover:underline">Donate Item</a>

            {/* These will later move to Dashboard */}
            <a href="/my-requests" className="hover:underline">My Requests</a>
            <a href="/my-donations" className="hover:underline">My Donations</a>
          </nav>
        )}

        {/* PAGE CONTENT */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER — Clean on Homepage */}
        <footer className="text-center text-xs text-gray-500 py-6 space-y-2">
          <div>© 2026 Redheaded Stepchild Tech™ • v1.0.0</div>

          {/* Full footer only on non-home pages */}
          {!isHome && (
            <div className="flex justify-center gap-4 flex-wrap text-gray-600">

              {/* These will move to Who We Are */}
              <a href="/about" className="hover:text-gray-800 transition">About RST</a>
              <a href="/about#faq" className="hover:text-gray-800 transition">FAQ</a>
              <a href="/report-bug" className="hover:text-gray-800 transition">Report a Bug</a>
              <a href="/changelog" className="hover:text-gray-800 transition">Changelog</a>
              <a href="mailto:techteam@RedheadedStepchildTech.com" className="hover:text-gray-800 transition">Contact Us</a>

              {/* Dashboard links (future) */}
              <a href="/my-requests" className="hover:text-gray-800 transition">My Requests</a>
              <a href="/my-donations" className="hover:text-gray-800 transition">My Donations</a>

              <span className="text-gray-400">Contact / Support (coming soon)</span>
            </div>
          )}
        </footer>

      </body>
    </html>
  );
}
