"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Optional Banner */}
      {showBanner && (
        <div className="bg-red-500 text-white text-center py-3 mb-6 shadow-md">
          Welcome to RST 1.0 — Helping People, One Request at a Time
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center pt-6 pb-12 px-6">
        <img
          src="/heart.png"
          alt="RST Heart"
          className="w-32 h-32 mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Real Help. Real People. Real Fast.
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          RST connects people in need with people who want to help — quickly,
          privately, and without judgment.
        </p>

        {/* Three Core Buttons */}
        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">

          {/* 1. Donations — Monetary */}
          <a
            href="/donations"
            className="w-full px-6 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700"
          >
            Donations — Monetary
          </a>

          {/* 2. Donations — In‑Kind */}
          <a
            href="/donations-inkind"
            className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg font-semibold text-lg hover:bg-gray-900"
          >
            Donations — In‑Kind
          </a>

          {/* 3. Who We Are / FAQ */}
          <a
            href="/who-we-are"
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700"
          >
            Who We Are / FAQ
          </a>

        </div>
      </section>

    </main>
  );
}
