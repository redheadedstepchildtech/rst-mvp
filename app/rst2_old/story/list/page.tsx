import fs from "fs";
import path from "path";

export default async function StoryList() {
  const dir = path.join(process.cwd(), "data", "stories");
  const files = fs.readdirSync(dir);

  const stories = files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    return JSON.parse(content);
  });

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Stories</h1>

      <div className="space-y-4">
        {stories.map((story) => (
          <a
            key={story.id}
            href={`/rst2/story/${story.id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <p className="font-semibold">{story.title}</p>
            <p className="text-sm text-gray-600">
              {new Date(story.createdAt).toLocaleString()}
            </p>
          </a>
        ))}
      </div>

      <a
        href="/rst2/story/create"
        className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 block text-center"
      >
        Create New Story
      </a>
    </div>
  );
}