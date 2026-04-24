"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PhotoManager({ itemId, isDonation }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    if (!files.length) return;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file as Blob);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: data.url,
          donationId: isDonation ? itemId : undefined,
          helpOfferId: !isDonation ? itemId : undefined,
        }),
      });
    }

    setUploading(false);
    router.refresh();
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Add Photos</h3>

      <input
        type="file"
        multiple
        onChange={handleUpload}
        className="border p-2 rounded"
      />

      {uploading && <p className="text-sm text-gray-600 mt-2">Uploading…</p>}
    </div>
  );
}