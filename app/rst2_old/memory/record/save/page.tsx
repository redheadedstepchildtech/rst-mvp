import fs from "fs";
import path from "path";

export default async function SaveMemoryPage({ searchParams }) {
  const title = searchParams.title || "";
  const text = searchParams.text || "";
  const photo = searchParams.photo || "";
  const audio = searchParams.audio || "";

  // Create a unique ID for the story
  const id = Date.now().toString();

  // Build the story object
  const story = {
    id,
    title,
    text,
    photo,
    audio,
    createdAt: new Date().toISOString(),
  };

  // Ensure the stories directory exists
  const storiesDir = path.join(process.cwd(), "data", "stories");
  if (!fs.existsSync(storiesDir)) {
    fs.mkdirSync(storiesDir, { recursive: true });
  }

  // Save the story to a JSON file
  const filePath = path.join(storiesDir, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2));

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Your Memory Has Been Saved</h1>

      <p className="text-lg text-gray-700 mb-8">
        Thank you for sharing your story.  
        It will be treasured for years to come.
      </p>

      <div className="flex flex-col gap-4">
        <a
          href={`/rst2/story/${id}`}
          className="px-6 py-3 text-lg rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          View Memory
        </a>

        <a
          href="/rst2/memory/record/step1"
          className="px-6 py-3 text-lg rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Record Another Memory
        </a>

        <a
          href="/rst2"
          className="px-6 py-3 text-lg rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}