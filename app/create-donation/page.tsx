"use client";

import { useEffect } from "react";

export default function RedirectToUnifiedDonation() {
  useEffect(() => {
    window.location.href = "/create-need?type=donation";
  }, []);

  return (
    <div className="p-10 text-center text-lg">
      Redirecting to the new donation creator…
    </div>
  );
}