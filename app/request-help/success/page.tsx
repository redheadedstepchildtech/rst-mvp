"use client";

import { useState, useEffect } from "react";
import Toast from "@/components/Toast";

export default function RequestHelpSuccess() {
  const [showToast, setShowToast] = useState(true);
window.location.href = "/?success=request";
window.location.href = "/?success=donation";

<a
  href="/request-help"
  className="inline-block mt-2 text-blue-600 underline hover:text-blue-800"
>
  Submit another request
</a>

<a
  href="/donate-item"
  className="inline-block mt-2 text-blue-600 underline hover:text-blue-800"
>
  Submit another donation
</a>

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 text-center">
      {showToast && (
        <Toast message="Request submitted successfully!" onClose={() => setShowToast(false)} />
      )}

      <h1 className="text-3xl font-bold text-green-700">Request Submitted</h1>
      <p className="text-gray-700">
        Your request for help has been received. Someone from the community will reach out if they can assist.
      </p>

      <a
        href="/"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Return Home
      </a>
    </div>
  );
}