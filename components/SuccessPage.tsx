"use client";

import { useState, useEffect } from "react";
import Toast from "@/components/Toast";

export default function SuccessPage({ title, message }) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 text-center animate-fadeIn">
      {showToast && (
        <Toast
          message="Submitted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="text-green-600 text-6xl font-bold">✓</div>

      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-700">{message}</p>

      <div className="flex justify-center gap-4 mt-6">
        <a
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Return Home
        </a>

        <a
          href=".."
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Submit Another
        </a>
      </div>
    </div>
  );
}

