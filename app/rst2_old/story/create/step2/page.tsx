export default async function StoryCreateStep2({ searchParams }) {
  const params = await searchParams;
  const title = params.title || "";

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Tell a Story</h1>
<a
  href="/rst2/admin"
  className="inline-block mb-4 px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
>
  ← Back to Dashboard
</a>

      <p className="text-gray-700 text-center">
        Take your time. Write as much or as little as you want.
      </p>

      {/* Show the title so the user feels anchored */}
      <div className="p-3 bg-gray-50 border rounded-lg">
        <p className="text-sm text-gray-600">Story Title</p>
        <p className="font-semibold">{title}</p>
      </div>

      {/* Form */}
      <form action="/rst2/story/create/step3" method="GET" className="space-y-4">

        {/* Keep the title moving forward */}
        <input type="hidden" name="title" value={title} />

        <textarea
          name="text"
          placeholder="Write your story here..."
          className="w-full p-3 border rounded-lg h-48 leading-relaxed"
          required
        ></textarea>

        {/* Navigation */}
        <div className="flex justify-between">
          <a
            href={`/rst2/story/create?title=${encodeURIComponent(title)}`}
            className="p-3 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400"
          >
            ← Back
          </a>

          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Next →
          </button>
        </div>

      </form>
<a
  href="/rst2/admin"
  className="inline-block mb-4 px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300"
>
  ← Back to Dashboard
</a>

    </div>
  );
}