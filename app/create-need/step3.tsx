"use client";

import { uploadPhoto } from "@/app/actions/needActions";

export default function Step3({ photos, setPhotos }) {
  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadPhoto(formData);
    if (res?.url) {
      setPhotos([...photos, res.url]);
    }
  }

  function removePhoto(url) {
    setPhotos(photos.filter((p) => p !== url));
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <div className="w-full py-4 bg-slate-700 text-center rounded-xl font-semibold cursor-pointer">
          Add Photo
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {photos.length === 0 ? (
        <div className="border border-dashed border-slate-600 rounded-xl p-4 text-center text-sm text-slate-400">
          No photos added yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((url) => (
            <div key={url} className="relative">
              <img
                src={url}
                className="rounded-xl w-full h-32 object-cover border border-slate-700"
              />
              <button
                type="button"
                onClick={() => removePhoto(url)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}