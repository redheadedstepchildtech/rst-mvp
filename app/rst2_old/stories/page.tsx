const category = searchParams?.category;
const tag = searchParams?.tag;
const q = searchParams?.q?.toLowerCase();

export default function StoriesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Stories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {stories.map((story) => (
   
<a
  href="/rst2/create"
  className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  + Create Story
</a>
    <a
      key={story.id}
      href={`/rst2/story/${story.id}`}
      className="block border rounded-md shadow-sm hover:shadow-md transition p-4"
    >
      {story.thumbnailUrl && (
        <img
          src={story.thumbnailUrl}
          alt={story.title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}

let filtered = stories;

if (category) {
  filtered = filtered.filter((s) => s.category === category);
}

if (tag) {
  filtered = filtered.filter((s) => s.tags?.includes(tag));
}

if (q) {
  filtered = filtered.filter((s) =>
    s.title.toLowerCase().includes(q) ||
    s.summary.toLowerCase().includes(q)
  );
}

<form method="GET" className="mb-6">
  <input
    type="text"
    name="q"
    placeholder="Search stories..."
    className="w-full p-3 border rounded-md"
    defaultValue={searchParams?.q || ""}
  />
</form>

if (tag) {
  filtered = filtered.filter((s) => s.tags?.includes(tag));
}
      <h2 className="text-lg font-semibold mb-1">{story.title}</h2>

      <p className="text-gray-700 text-sm line-clamp-3">
        {story.summary}
      </p>
    </a>
  ))}
</div>