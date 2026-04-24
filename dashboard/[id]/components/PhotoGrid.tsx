"use client";

import { useRouter } from "next/navigation";

interface PhotoGridProps {
  photos: { id: string; url: string }[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo?")) return;

    await fetch(`/api/photos/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {photos.map((photo) => (
        <div key={photo.id} className="relative">
          <img
            src={photo.url}
            alt="Photo"
            className="w-full h-24 object-cover rounded"
          />

          <button
            type="button"
            onClick={() => handleDelete(photo.id)}
            className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}