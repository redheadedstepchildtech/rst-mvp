import fs from "fs";
import path from "path";

export default function TagResults({ params }) {
  const tag = decodeURIComponent(params.tag);

  const videoDir = path.join(process.cwd(), "data", "videos");
  const files = fs.readdirSync(videoDir);

  const videos = files
    .map(f => JSON.parse(fs.readFileSync(path.join(videoDir, f), "utf8")))
    .filter(v => (v.tags || []).includes(tag));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <a
          href="/rst2/admin/video-library/tags"
          className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          ← Back to Tags
        </a>

        <h1 className="text-3xl font-bold text-gray-900">#{tag}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map(video => (
            <a
              key={video.id}
              href={`/rst2/admin/video-library/${video.id}`}
              className="bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <img
                src={video.thumbnail}
                className="w-full h-32 object-cover rounded-md border"
              />
              <p className="mt-2 text-sm font-semibold text-gray-800">
                {video.title}
              </p>
            </a>
          ))}
        </div>

        {videos.length === 0 && (
          <p className="text-gray-600">No videos with this tag yet.</p>
        )}
      </div>
    </div>
  );
}