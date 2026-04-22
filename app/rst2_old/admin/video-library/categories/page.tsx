import fs from "fs";
import path from "path";

export default function CategoryBrowser() {
  const videoDir = path.join(process.cwd(), "data", "videos");
  const files = fs.readdirSync(videoDir);

  const videos = files.map(f =>
    JSON.parse(fs.readFileSync(path.join(videoDir, f), "utf8"))
  );

  // Extract unique categories
  const categories = Array.from(
    new Set(
      videos.flatMap(v => v.categories || [])
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

        <h1 className="text-3xl font-bold text-gray-900">Browse by Category</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(cat => (
            <a
              key={cat}
              href={`/rst2/admin/video-library/categories/${encodeURIComponent(cat)}`}
              className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <p className="text-lg font-semibold text-gray-800">{cat}</p>
            </a>
          ))}
        </div>

        {categories.length === 0 && (
          <p className="text-gray-600">No categories yet.</p>
        )}
      </div>
    </div>
  );
}