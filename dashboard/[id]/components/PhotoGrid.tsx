export function PhotoGrid({ photos }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;

    await fetch(`/api/photos/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
      {photos.map((photo) => (
        <div key={photo.id} className="relative group">
          <img
            src={photo.url}
            className="w-full h-32 object-cover rounded"
          />

          <button
            onClick={() => handleDelete(photo.id)}
            className="absolute top-1 right-1 bg-white/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}