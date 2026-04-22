import fs from "fs";
import path from "path";

export default function EditVideo({ params }) {
  const { id } = params;

  const metaPath = path.join(process.cwd(), "data", "videos", `${id}.json`);
  const video = JSON.parse(fs.readFileSync(metaPath, "utf8"));

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <a
        href={`/rst2/admin/video-library/${id}`}
        className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
      >
        ← Back to Video
      </a>

      <h1 className="text-3xl font-bold">Edit Video</h1>

      <form
        action={`/rst2/admin/video-library/${id}/update`}
        method="POST"
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          defaultValue={video.title}
          className="w-full p-3 border rounded-lg"
          required
        />

        <textarea
          name="description"
          defaultValue={video.description || ""}
          className="w-full p-3 border rounded-lg h-32"
          placeholder="Add a description..."
        ></textarea>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Replace Video (optional)
          </label>
          <input
            type="file"
            name="video"
            accept="video/mp4,video/webm"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}