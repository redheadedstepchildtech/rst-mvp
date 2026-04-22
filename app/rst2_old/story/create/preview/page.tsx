export default async function StoryPreview({ searchParams }) {
  const params = await searchParams;

  const title = params.title || "";
  const text = params.text || "";
  const photo = params.photo || "";
  const audio = params.audio || "";

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Preview Your Story</h1>

<a
  href="/rst2/admin"
  className="inline-block mb-4 px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
>
  ← Back to Dashboard
</a>

<a
  href="/rst2/admin"
  className="inline-block mb-4 px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
>
  ← Back to Dashboard
</a>

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
            <img src={photo} className="rounded-lg border" />
          </div>
        )}

        {audio && (
          <div>
            <p className="text-sm text-gray-600">Audio</p>
            <audio controls src={audio} className="w-full" />
          </div>
        )}
      </div>

      <a
        href={`/rst2/story/create/step4?title=${encodeURIComponent(
          title
        )}&text=${encodeURIComponent(text)}&photo=${encodeURIComponent(photo)}`}
        className="p-3 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400"
      >
        ← Back
      </a>

      <form
        action="/rst2/story/save"
        method="POST"
        className="space-y-4"
      >
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="text" value={text} />
        <input type="hidden" name="photo" value={photo} />
        <input type="hidden" name="audio" value={audio} />

        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 w-full"
        >
          Save Story
        </button>
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