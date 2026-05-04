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
        <header className="p-4 bg-white shadow flex items-center justify-between">
  <div className="max-w-5xl mx-auto flex items-center gap-3">
    <GlobalSearch />

    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs">
      Beta
    </span>
  </div>
</header>

<nav className="flex gap-4 text-sm">
  <a href="/request-help" className="hover:underline">Request Help</a>
  <a href="/donate-item" className="hover:underline">Donate Item</a>
</nav>

<nav className="flex gap-4 text-sm">
  <a href="/request-help" className="hover:underline">Request Help</a>
  <a href="/donate-item" className="hover:underline">Donate Item</a>
  <a href="/my-requests" className="hover:underline">My Requests</a>
  <a href="/my-donations" className="hover:underline">My Donations</a>
</nav>

        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="text-center text-xs text-gray-500 py-6 space-y-2">
  <div>© 2026 Redheaded Stepchild Tech™ • v1.0.0</div>

  <div className="flex justify-center gap-4">
    <a
      href="mailto:techteam@RedheadedStepchildTech.com"
      className="text-gray-600 hover:text-gray-800 transition"
    >
      Contact Us
    </a>

    <span className="text-gray-400">•</span>
<span className="text-gray-400">•</span>
<a href="/request-help" className="text-gray-600 hover:text-gray-800 transition">Request Help</a>

<span className="text-gray-400">•</span>
<a href="/donate-item" className="text-gray-600 hover:text-gray-800 transition">Donate Item</a>

    <a
      href="/report-bug"
      className="text-gray-600 hover:text-gray-800 transition"
    >
      Report a Bug
    </a>

    <span className="text-gray-400">•</span>

    <a
      href="/changelog"
      className="text-gray-600 hover:text-gray-800 transition"
    >
      Changelog
    </a>
  </div>
</footer>
<footer className="mt-12 border-t pt-6 pb-10 text-center text-sm text-gray-600">
  <div className="flex justify-center gap-6 flex-wrap">

    <a href="/about" className="hover:text-gray-800 transition">
      About RST
    </a>

    <a href="/about#faq" className="hover:text-gray-800 transition">
      FAQ
    </a>

    <a href="/my-requests" className="hover:text-gray-800 transition">
      My Requests
    </a>

    <a href="/my-donations" className="hover:text-gray-800 transition">
      My Donations
    </a>

    <span className="text-gray-400">Contact / Support (coming soon)</span>

  </div>

  <p className="mt-4 text-gray-400">
    © {new Date().getFullYear()} Redheaded Stepchild Tech
  </p>
</footer>
<footer className="mt-12 border-t pt-6 pb-10 text-center text-sm text-gray-600">
  <div className="flex justify-center gap-6 flex-wrap">

    <a href="/about" className="hover:text-gray-800 transition">
      About RST
    </a>

    <a href="/about#faq" className="hover:text-gray-800 transition">
      FAQ
    </a>


    <a href="/my-requests" className="hover:text-gray-800 transition">
      My Requests
    </a>

<section>
  <h2 className="text-3xl font-bold mb-3">Mission Statement</h2>
  <p className="text-gray-700 leading-relaxed">
    Redheaded Stepchild Tech exists to provide simple, judgment‑free support for people 
    facing overwhelming situations. Our mission is to create a platform where anyone can 
    ask for help, offer assistance, and connect with their community in a way that is 
    respectful, dignified, and easy to use. We believe that small acts of kindness can 
    change the trajectory of a person’s life, and RST is built to make those moments 
    possible.
  </p>
</section>

    <a href="/my-donations" className="hover:text-gray-800 transition">
      My Donations
    </a>

    <span className="text-gray-400">
      Contact / Support (coming soon)
    </span>

  </div>

  <p className="mt-4 text-gray-400">
    © {new Date().getFullYear()} Redheaded Stepchild Tech
  </p>
</footer>

<footer className="text-center text-gray-500 text-sm py-6 space-y-1">
  <div>© 2026 Redheaded Stepchild Tech™</div>
  <div className="text-gray-400">A Redheaded Stepchild Tech Project</div>
</footer>

      </body>
    </html>
  );
}