export default function CreateStoryPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <Link
        href="/rst2/stories"
        className="inline-block mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to Stories
      </Link>

      <h1 className="text-2xl font-bold mb-6">Create a New Story</h1>

      <form action="/rst2/story/create" method="post" className="space-y-6">

        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Story Text</label>
          <textarea
            name="text"
            rows={8}
            className="w-full border rounded-md p-2"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Thumbnail URL (optional)</label>
          <input
            type="text"
            name="thumbnail"
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Story
        </button>

      </form>
    </main>
  );
}