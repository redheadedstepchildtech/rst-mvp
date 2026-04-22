export default async function StoryCreateStep4({ searchParams }) {
  const params = await searchParams;

  const title = params.title || "";
  const text = params.text || "";
  const photo = params.photo || "";

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
        Add an audio recording if you’d like. This step is optional.
      </p>

      {/* Show the story so far */}
      <div className="p-3 bg-gray-50 border rounded-lg space-y-2">
        <div>
          <p className="text-sm text-gray-600">Story Title</p>
          <p className="font-semibold">{title}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Your Story</p>
          <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
        </div>

        {photo && (
          <div>
            <p className="text-sm text-gray-600">Photo</p>
            <img
              src={photo}
              alt="Story photo"
              className="rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* Form */}
      <form
        action="/rst2/story/create/preview"
        method="GET"
        className="space-y-4"
      >
        {/* Keep everything moving forward */}
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="text" value={text} />
        <input type="hidden" name="photo" value={photo} />

        <input
          type="file"
          name="audio"
          accept="audio/*"
          className="w-full p-3 border rounded-lg"
          disabled
/>
<p className="text-sm text-gray-500">
  Audio upload coming soon.
</p>

        {/* Navigation */}
        <div className="flex justify-between">
          <a
            href={`/rst2/story/create/step3?title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}&photo=${encodeURIComponent(photo)}`}
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