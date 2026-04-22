export default function StoryPage({ params }) {
  const story = ... // however you're loading it

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <Link
        <a href="/rst2/stories" className="text-blue-600 hover:underline block mb-6">
  ← Back to Stories
</a>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>

      {story.thumbnail && (
        <img
          src={story.thumbnail}
          alt={story.title}
          className="w-full rounded-md mb-6"
        />
      )}

<div className="text-center text-gray-600 text-sm mb-6">
  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
  {story.category && <span> • {story.category}</span>}
  {story.tags?.length > 0 && (
    <span> • {story.tags.join(", ")}</span>
  )}
</div>
      <div className="text-center text-gray-600 text-sm mb-6">
  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
  {story.category && <span> • {story.category}</span>}
  {story.tags?.length > 0 && (
    <span> • {story.tags.join(", ")}</span>
  )}
</div>

      <div className="flex items-center gap-4">
        <Link
          href={`/rst2/story/${story.id}/edit`}
          className="text-blue-600 hover:underline text-sm"
        >
          ✏️ Edit Story
        </Link>

        <form action={`/rst2/story/${story.id}/delete`} method="post">
          <button
            type="submit"
            className="text-red-600 hover:underline text-sm"
          >
            🗑 Delete Story
          </button>
        </form>
      </div>

<a
  href={`/rst2/story/${story.id}/edit`}
  className="inline-block mt-8 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Edit Story
</a>
    </main>
  );
}