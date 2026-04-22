"use client";

import { useState } from "react";

export default function AdminBoostPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function sendBoosts() {
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/boost/send", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("done");
        setMessage(
          data.message || "Boosts sent successfully. Helpers have been notified."
        );
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network or server error.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-sky-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Admin: Send Boosts</h1>
        <p className="text-gray-700 mb-6">
          This will send SMS alerts for all pending boosted posts.
        </p>

        <button
          onClick={sendBoosts}
          disabled={status === "sending"}
          className={`w-full py-3 rounded-lg text-white transition ${
            status === "sending"
              ? "bg-gray-400"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {status === "sending" ? "Sending..." : "Send Boosts Now"}
        </button>

        {message && (
          <p
            className={`mt-4 ${
              status === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}