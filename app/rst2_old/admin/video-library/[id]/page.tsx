import fs from "fs";
import path from "path";

export default function VideoDetails({ params }) {
  const { id } = params;

  const videoPath = path.join(process.cwd(), "data", "videos", `${id}.json`);
  const video = JSON.parse(fs.readFileSync(videoPath, "utf8"));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back to Library */}
        <a
          href="/rst2/admin/video-library"
          className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          ← Back to Video Library
        </a>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900">{video.title}</h1>

        {/* Thumbnail */}
        <img
          src={video.thumbnail}
          className="w-full max-h-64 object-cover rounded-lg border"
        />

        {/* Video Player */}
        <video
          src={video.url}
          controls
          className="w-full rounded-lg border"
        />

        {/* Metadata */}
        <div className="bg-white p-4 rounded-lg shadow-sm border space-y-2">
          <p><span className="font-semibold">Uploaded:</span> {new Date(video.createdAt).toLocaleString()}</p>
          <p><span className="font-semibold">File:</span> {video.url}</p>
          <p><span className="font-semibold">Thumbnail:</span> {video.thumbnail}</p>
        </div>

{video.description && (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
    <p className="text-gray-700 whitespace-pre-wrap">{video.description}</p>
  </div>
)}

{video.categories?.length > 0 && (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <h3 className="font-semibold text-gray-900 mb-1">Categories</h3>
    <p className="text-gray-700">{video.categories.join(", ")}</p>
  </div>
)}

{video.tags?.length > 0 && (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <h3 className="font-semibold text-gray-900 mb-1">Tags</h3>
    <p className="text-gray-700">{video.tags.join(", ")}</p>
  </div>
)}

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={`/rst2/admin/video-library/${id}/delete`}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Video
          </a>

<a
  href={`/rst2/admin/video-library/${id}/edit`}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Edit Video
</a>
        </div>
      </div>
    </div>
  );
}