"use client";

export default function Step3({ photos, setPhotos }) {
  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    setPhotos(files);
  }

  return (
    <div>
      <label className="block mb-4">
        <span className="text-sm font-medium">Upload Photos (optional)</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-1 w-full"
        />
      </label>

      {photos && photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {photos.map((file, idx) => (
            <div key={idx} className="border rounded p-1">
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded preview"
                className="w-full h-auto rounded"
              />
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">
        Photo upload processing coming soon
      </p>
    </div>
  );
}