import { useRef } from "react";

interface PhotoUploadProps {
  photos: File[];
  setPhotos: (files: File[]) => void;
  max?: number;
}

export default function PhotoUpload({
  photos,
  setPhotos,
  max = 3,
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    // Enforce max limit
    const allowed = max - photos.length;
    const selected = newFiles.slice(0, allowed);

    setPhotos([...photos, ...selected]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
  };

  return (
    <div>
      {/* Upload Box */}
      <div
        className="upload-box border border-gray-300 rounded p-6 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p>Drag & drop or click to upload</p>
        <p className="text-sm text-gray-500">Max {max} photos</p>
      </div>
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.url;
};

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Thumbnails */}
      <div className="thumb-grid grid grid-cols-3 gap-3 mt-4">
        {photos.map((file, index) => {
          const preview = URL.createObjectURL(file);

          return (
            <div key={index} className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-24 object-cover rounded"
              />

const handleFiles = async (files: FileList | null) => {
  if (!files) return;

  const newFiles = Array.from(files);

  const allowed = max - photos.length;
  const selected = newFiles.slice(0, allowed);

  const uploadedUrls: string[] = [];

  for (const file of selected) {
    const url = await uploadFile(file);
    uploadedUrls.push(url);
  }

  setPhotos([...photos, ...uploadedUrls]);
};

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}