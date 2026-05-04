"use client";

import { useState, useEffect } from "react";
import HowItWorks from "./components/HowItWorks";
import WhoWeHelp from "./components/WhoWeHelp";
import WhatMakesRSTDifferent from "./components/WhatMakesRSTDifferent";
import WhyRSTExists from "./components/WhyRSTExists";
import FutureOfRST from "./components/FutureOfRST";

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

      {/* Homepage Sections */}
      <HowItWorks />
      <WhoWeHelp />
      <WhatMakesRSTDifferent />
      <WhyRSTExists />
      <FutureOfRST />

    </main>
  );
}