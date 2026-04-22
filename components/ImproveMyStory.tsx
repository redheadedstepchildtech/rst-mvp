"use client";

import { useState } from "react";

export default function ImproveMyStory({ id, originalStory, onImprove }) {
  const [loading, setLoading] = useState(false);
  const [improved, setImproved] = useState("");
  const [open, setOpen] = useState(false);
  const [microSize, setMicroSize] = useState("medium");

{/* MICRO SUMMARY FONT SIZE */}
<div className="mt-4">
  <h3 className="text-md font-semibold text-gray-800 mb-2">
    Micro‑Summary Font Size
  </h3>

  <div className="grid grid-cols-3 gap-2">
    <button
      onClick={() => setMicroSize("small")}
      className={`py-2 rounded-lg border font-semibold ${
        microSize === "small"
          ? "bg-purple-600 text-white border-purple-700"
          : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      Small
    </button>

    <button
      onClick={() => setMicroSize("medium")}
      className={`py-2 rounded-lg border font-semibold ${
        microSize === "medium"
          ? "bg-purple-600 text-white border-purple-700"
          : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      Medium
    </button>

    <button
      onClick={() => setMicroSize("large")}
      className={`py-2 rounded-lg border font-semibold ${
        microSize === "large"
          ? "bg-purple-600 text-white border-purple-700"
          : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      Large
    </button>
  </div>
</div>

  async function handleImprove() {
    setLoading(true);

    const res = await fetch("/api/improve", {
      method: "POST",
      body: JSON.stringify({ story: originalStory }),
    });

    const data = await res.json();
    setImproved(data.improved);
    setLoading(false);
  }

  async function acceptImproved() {
    // Save permanently to /data/<id>.json
    await fetch("/api/save-story", {
      method: "POST",
      body: JSON.stringify({
        id,
        story: improved,
      }),
    });

    // Update UI
    onImprove(improved);
    setOpen(false);
  }

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Improve My Story
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">AI Story Improvement</h2>

            {!improved && !loading && (
              <button
                onClick={handleImprove}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Generate Improved Version
              </button>
            )}

            {loading && <p className="text-gray-600">Improving story…</p>}

            {improved && (
              <>
                <textarea
                  className="w-full h-40 border p-2 rounded mb-4"
                  value={improved}
                  readOnly
                />

                <button
                  onClick={acceptImproved}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
                >
                  Accept Improved Story
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}