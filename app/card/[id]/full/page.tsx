import { loadCardData } from "../loadCardData";
import CardLayout from "../CardLayout";

export default async function FullPageCard({ params }) {
  const { id } = params;

  // Load minisite data + QR + top needs
  const data = await loadCardData(id);

  return (
    <CardLayout data={data} size="full">
      {/* FULL NEEDS LIST */}
      {data.needs && (
        <div className="w-full text-left mb-8">
          <h2 className="text-2xl font-semibold mb-3">Needs</h2>
          <p className="text-xl whitespace-pre-line leading-relaxed">
            {data.needs}
          </p>
        </div>
      )}

      {/* FULL STORY */}
      {data.story && (
        <div className="w-full text-left">
          <h2 className="text-2xl font-semibold mb-3">Story</h2>
          <p className="text-xl whitespace-pre-line leading-relaxed">
            {data.story}
          </p>
        </div>
      )}
    </CardLayout>
  );
}