"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReportPhotoPage() {
  const router = useRouter();
  const params = useSearchParams();

  const needId = params.get("needId") || "";
  const photoUrl = params.get("photoUrl") || "";

  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReport() {
    setLoading(true);

    await fetch("/api/report-photo", {
      method: "POST",
      body: JSON.stringify({
        needId,
        photoUrl,
        reason,
        notes,
      }),
    });

    router.push(`/rst/needs/${needId}`);
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Report a Photo</h1>

      <p className="text-gray-700 mb-4">
        Help us keep this platform safe and respectful. Please tell us why you
        are reporting this photo.
      </p>

      {/* ⭐ Photo Preview */}
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Reported"
          className="w-full h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="bg-gray-100 text-gray-500 p-4 rounded mb-4 text-center">
          No photo preview available
        </div>
      )}

      {/* ⭐ Reason Dropdown */}
      <label className="block mb-2 font-medium">Reason</label>
      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Select a reason…</option>
        <option value="inappropriate">Inappropriate content</option>
        <option value="unsafe">Unsafe or harmful</option>
        <option value="privacy">Violates someone's privacy</option>
        <option value="spam">Spam or misleading</option>
        <option value="other">Other</option>
      </select>

      {/* ⭐ Optional Notes */}
      <label className="block mb-2 font-medium">Additional Notes (optional)</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border p-2 rounded mb-6"
        rows={4}
        placeholder="Add any extra details…"
      />

      {/* ⭐ Submit Button */}
      <button
        disabled={loading}
        onClick={submitReport}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
      >
        Submit