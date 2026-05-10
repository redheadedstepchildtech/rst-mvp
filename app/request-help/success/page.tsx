"use client";

import { useEffect } from "react";

export default function SuccessPage() {

  useEffect(() => {
    console.log("Success page loaded");
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Success!</h1>

      <p>Your request has been submitted.</p>

      <a
        href="/donate-item"
        className="inline-block mt-4 text-blue-600 underline hover:text-blue-800"
      >
        Submit another donation
      </a>
    </div>
  );
}