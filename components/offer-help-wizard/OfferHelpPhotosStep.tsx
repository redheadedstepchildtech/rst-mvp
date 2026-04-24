"use client";

import { useState } from "react";

export default function OfferHelpPhotosStep({ onNext }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const uploaded: string[] = [];
    const fileList = Array.from(files as FileList);

    for (const file of fileList) {
      const formData = new FormData();
      formData.append("file", file as Blob);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      uploaded.push(json.url);
    }

    setPhotos((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
      />

      {uploading && <p>Uploading...</p>}

      <div className="grid grid-cols-3 gap-2 mt-4">
        {photos.map((url) => (
          <img
            key={url}
            src={url}
            className="w-full h-24 object-cover rounded"
          />
        ))}
      </div>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onNext(photos)}
      >
        Continue
      </button>
    </div>
  );
}