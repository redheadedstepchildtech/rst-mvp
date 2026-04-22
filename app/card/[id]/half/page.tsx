import { loadCardData } from "../loadCardData";
import CardLayout from "../CardLayout";

export default async function HalfPageCard({ params }) {
  const { id } = params;

  // Load minisite data + QR + top needs
  const data = await loadCardData(id);

  // Short story excerpt (clean, safe, no cutoff mid-word)
  const storyExcerpt = data.story
    ? data.story.length > 300
      ? data.story.substring(0, data.story.lastIndexOf(" ", 280)) + "..."
      : data.story
    : "";

  return (
    <CardLayout data={data} size="half">
      {/* FULL NEEDS LIST */}
      {data.needs && (
        <div className="w-full text-left mb-6">
          <h2 className="text-xl font-semibold mb-2">Needs</h2>
          <p className="text-lg whitespace-pre-line">{data.needs}</p>
        </div>
      )}

      {/* STORY EXCERPT */}
      {storyExcerpt && (
        <div className="w-full text-left">
          <h2 className="text-xl font-semibold mb-2">Story</h2>
          <p className="text-lg whitespace-pre-line">{storyExcerpt}</p>
        </div>
      )}
    </CardLayout>
  );
}