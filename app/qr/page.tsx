"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QRGeneratorPage() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateProfile() {
    setLoading(true);

    const res = await fetch("/api/create-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, greeting })
    });

    const data = await res.json();
    const id = data.profileId;
    setProfileId(id);

    const donationUrl = `${window.location.origin}/donation/${id}`;
    const qr = await QRCode.toDataURL(donationUrl);
    setQrDataUrl(qr);

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-xl shadow text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Generate Donation QR Code</h1>

      {!qrDataUrl && (
        <>
          <label className="block mb-4">
            <span className="font-semibold">Name</span>
            <input
              className="mt-2 w-full p-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </label>

          <label className="block mb-6">
            <span className="font-semibold">Greeting</span>
            <input
              className="mt-2 w-full p-3 border rounded-lg"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Thank you for your kindness!"
            />
          </label>

          <button
            onClick={handleCreateProfile}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            {loading ? "Creating…" : "Generate QR Code"}
          </button>
        </>
      )}

      {qrDataUrl && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Your QR Code</h2>
          <img src={qrDataUrl} alt="QR Code" className="mx-auto mb-6" />

          <p className="text-gray-700 mb-4">
            This QR links to:
            <br />
            <span className="font-mono text-sm">{`${window.location.origin}/donation/${profileId}`}</span>
          </p>

          <a
            href={qrDataUrl}
            download={`donation-${profileId}.png`}
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}