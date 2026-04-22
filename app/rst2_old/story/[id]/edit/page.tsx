export default function EditStoryPage({ params }) {
  const story = ... // however you're loading it

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <Link
        href={`/rst2/story/${story.id}`}
        className="inline-block mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to Story
      </Link>

      <h1 className="text-2xl font-bold mb-6">Edit Story</h1>

      <form action={`/rst2/story/${story.id}/edit`} method="post" className="space-y-6">

        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={story.title}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Story Text</label>
          <textarea
            name="text"
            rows={8}
            defaultValue={story.text}
            className="w-full border rounded-md p-2"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Thumbnail URL (optional)</label>
          <input
            type="text"
            name="thumbnail"
            defaultValue={story.thumbnail}
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>

      </form>
    </main>
  );
}