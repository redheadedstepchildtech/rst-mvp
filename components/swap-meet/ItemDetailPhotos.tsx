import { Photo } from "@/types";

interface Props {
  photos: Photo[];
}

export default function ItemDetailPhotos({ photos }: Props) {
  const main = photos?.[0]?.url;

  return (
    <div className="mb-6">
      {main && (
        <img
          src={main}
          alt="Main photo"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <div className="flex gap-3">
        {photos.slice(1).map((p) => (
          <img
            key={p.id}
            src={p.url}
            alt="Thumbnail"
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}