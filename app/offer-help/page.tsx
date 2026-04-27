"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OfferHelpPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <OfferHelpContent />
    </Suspense>
  );
}

function OfferHelpContent() {
  const params = useSearchParams();
  const name = params.get("name") || "this person";
  const email = params.get("email") || "";
  const phone = params.get("phone") || "";

  const [message, setMessage] = useState(
    `Hi ${name},\n\nI saw your support page and would like to offer help.\n\nI can provide:\n- \n\nBest,\n`
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    alert("Message copied. You can paste it into email or text.");
  };

  const mailtoHref = email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
        "Offer to Help"
      )}&body=${encodeURIComponent(message)}`
    : "";

  const telHref = phone ? `tel:${phone}` : "";

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Offer Help</h1>

      <p className="mb-4">
        You’re offering help to <strong>{name}</strong>. This might include items, time, rides,
        housing, equipment, job leads, or anything else that could make a difference.
      </p>

      {!email && !phone && (
        <p className="mb-4 text-sm text-red-600">
          This person did not share direct contact information. You may need to coordinate through
          whoever gave you this link or QR code.
        </p>
      )}

      {email && (
        <div className="mb-3">
          <p className="font-medium">Email</p>
          <a
            href={mailtoHref}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm"
          >
            Email {name}
          </a>
        </div>
      )}

      {phone && (
        <div className="mb-3">
          <p className="font-medium">Phone</p>
          <a
            href={telHref}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded font-semibold text-sm"
          >
            Call or Text {name}
          </a>
        </div>
      )}

      <div className="mt-6">
        <p className="font-medium mb-2">Draft your message</p>
        <textarea
          className="w-full border p-2 rounded"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleCopy}
          className="mt-2 bg-gray-800 text-white px-4 py-2 rounded font-semibold text-sm"
        >
          Copy Message
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Please be respectful, clear about what you can offer, and never pressure anyone to accept
        help they’re not comfortable with.
      </p>
    </div>
  );
}