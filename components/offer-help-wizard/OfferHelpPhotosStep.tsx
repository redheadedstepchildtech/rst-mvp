// OfferHelpPhotosStep.tsx
"use client";

import { useState } from "react";

export default function OfferHelpPhotosStep({ photos, setPhotos, onNext, onBack }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);

    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      uploadedUrls.push(data.url);
    }

    setUploading(false);
    setPhotos([...(photos || []), ...uploadedUrls]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Photos</h2>

      <input
        type="file"
        multiple
        onChange={handleUpload}
        className="border p-2 rounded"
      />

      {uploading && <p>Uploading...</p>}

      {photos?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((url) => (
            <img
              key={url}
              src={url}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="bg-gray-200 px-4 py-2 rounded">
          Back
        </button>
        <button onClick={onNext} className="bg-red-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
}