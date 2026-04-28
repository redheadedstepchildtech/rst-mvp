import "./globals.css";
import "./themes.css";
import { Dancing_Script } from "next/font/google";
import GlobalSearch from "@/components/GlobalSearch";

const dancing = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "RST",
  description: "Redheaded Stepchild Tech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${dancing.className}`}>
        
        {/* Global Header */}
        <header className="p-4 bg-white shadow">
          <div className="max-w-5xl mx-auto">
            <GlobalSearch />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="text-center text-xs text-gray-500 py-6 space-y-2">
          <div>© 2026 Redheaded Stepchild Tech™</div>

          <div className="flex justify-center gap-4">
            <a
              href="mailto:techteam@RedheadedStepchildTech.com"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Contact Us
            </a>

            <span className="text-gray-400">•</span>

            <a
              href="/report-bug"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Report a Bug
            </a>
          </div>
        </footer>

      </body>
    </html>
  );
}