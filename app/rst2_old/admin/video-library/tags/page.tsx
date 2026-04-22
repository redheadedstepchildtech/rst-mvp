import fs from "fs";
import path from "path";

export default function TagBrowser() {
  const videoDir = path.join(process.cwd(), "data", "videos");
  const files = fs.readdirSync(videoDir);

  const videos = files.map(f =>
    JSON.parse(fs.readFileSync(path.join(videoDir, f), "utf8"))
  );

  // Extract unique tags
  const tags = Array.from(
    new Set(
      videos.flatMap(v => v.tags || [])
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <a
          href="/rst2/admin/video-library"
          className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          ← Back to Video Library
        </a>

        <h1 className="text-3xl font-bold text-gray-900">Browse by Tag</h1>

        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <a
              key={tag}
              href={`/rst2/admin/video-library/tags/${encodeURIComponent(tag)}`}
              className="px-3 py-1 bg-white rounded-full shadow-sm border hover:bg-gray-50 text-sm"
            >
              #{tag}
            </a>
          ))}
        </div>

        {tags.length === 0 && (
          <p className="text-gray-600">No tags yet.</p>
        )}
      </div>
    </div>
  );
}