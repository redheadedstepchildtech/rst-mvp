import type { Need, User, Boost } from "@prisma/client";
import { addBoost, generateListing } from "@/app/actions/needActions";

const CATEGORY_ICONS: Record<string, string> = {
  Housing: "🏠",
  Food: "🍎",
  Medical: "🚑",
  Transportation: "🚗",
  Clothing: "🧥",
  Utilities: "🔌",
  Other: "📦",
};

function categoryIcon(category?: string) {
  return CATEGORY_ICONS[category ?? "Other"] ?? "📦";
}

type NeedWithBoosts = Need & { boosts: Boost[] };

type Props = {
  need: NeedWithBoosts;
  user: User;
};

export default function NeedCardFull({ need, user }: Props) {
  const created = new Date(need.createdAt).toLocaleDateString();
  const boostCount = need.boosts.length;

  const isBoosted = need.premium || need.wantsBoost || boostCount > 0;
  const score = boostCount * 10 + (need.premium ? 30 : 0);
  const isNonprofit = need.isNonprofit || user?.isNonprofit;

const CATEGORY_COLORS: Record<string, string> = {
  Housing: "purple",
  Food: "green",
  Medical: "red",
  Transportation: "blue",
  Clothing: "yellow",
  Utilities: "indigo",
  Other: "gray",
};
function categoryClasses(category?: string) {
  const color = CATEGORY_COLORS[category ?? "Other"] ?? "gray";

  return {
    badge: `bg-${color}-100 text-${color}-700`,
    border: `border-l-4 border-${color}-500`,
    glow: `shadow-[0_0_10px_rgba(0,0,0,0.05)]`,
  };
}
  return (
    <article
  className={`rounded-xl p-6 bg-white border shadow-sm transition
    ${categoryClasses(need.category).border}
    ${need.urgent ? "border-red-500" : "border-gray-200"}
  `}
>

    hover:shadow-md`}
>

      {/* HEADER */}
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
  <span>{categoryIcon(need.category)}</span>
  {need.title}
  {need.premium && <span>⭐</span>}
  {isBoosted && <span>⚡</span>}
  {isNonprofit && <span>🏛</span>}
  {need.urgent && <span>🆘</span>}
</h2>


          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {need.category && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {need.category}
              </span>
            )}

                {need.urgent && (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700">
             🆘 Urgent
              </span>
            )}
<Link
  href="/dashboard?sort=urgent"
  className={`px-4 py-2 rounded-full text-sm font-medium border ${
    sort === "urgent"
      ? "bg-red-600 text-white border-red-700"
      : "bg-white text-red-700 border-red-300 hover:bg-red-50"
  }`}
>
  Urgent
</Link>

            {need.premium && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                ⭐ Premium
              </span>
            )}

            {isBoosted && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                ⚡ Boosted
              </span>
            )}

            {isNonprofit && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                🏛 Nonprofit
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">{created}</p>
          <p className="mt-1 text-xs text-gray-500">
            Score: <span className="font-semibold">{score}</span>
          </p>
        </div>
      </header>

      {/* NONPROFIT INFO */}
      {need.nonprofitName && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Organization:</strong> {need.nonprofitName}
        </div>
      )}

      {need.ein && (
        <div className="text-sm text-gray-700">
          <strong>EIN:</strong> {need.ein}
        </div>
      )}

      {need.verified && (
        <div className="text-green-600 text-sm font-semibold">
          ✔ Verified Nonprofit
        </div>
      )}

      {/* STORY */}
      {need.story && (
        <p className="mt-4 text-sm text-gray-800 whitespace-pre-line leading-relaxed">
          {need.story}
        </p>
      )}

      {/* PHOTOS */}
      {need.photos?.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {need.photos.map((url) => (
            <img
              key={url}
              src={url}
              alt="Need photo"
              className="w-full h-28 object-cover rounded-lg shadow-sm"
            />
          ))}
        </div>
      )}

      {/* REPORT BUTTON */}
      <button
        className="mt-3 text-xs text-red-600 hover:underline"
        onClick={() => alert("Report submitted. Thank you.")}
      >
        Report Photo
      </button>

      {/* AI LISTING */}
{need.aiListing && (
  <section className="mt-6 border-t pt-4">
    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
      <span>{categoryIcon(need.category)}</span>
      AI‑Generated Listing
    </h3>

    <p className="text-gray-700 leading-relaxed flex items-start gap-2 whitespace-pre-wrap">
      <span className="text-xl">{categoryIcon(need.category)}</span>
      {need.aiListing}
    </p>
  </section>
)}

    </p>
  </section>
)}

<h4 className="font-semibold flex items-center gap-2">
  <span>{categoryIcon(other.category)}</span>
  {other.title}
</h4>

<p className="text-gray-700 leading-relaxed flex items-start gap-2">
  <span className="text-xl">{categoryIcon(need.category)}</span>
  {need.aiListing}
</p>

     </section>
      )}

      {/* AI APPRAISAL */}
{need.aiAppraisal && (
  <section className="mt-6 border-t pt-4">
    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
      <span>{categoryIcon(need.category)}</span>
      AI‑Generated Appraisal
    </h3>

    <p className="text-gray-700 leading-relaxed flex items-start gap-2 whitespace-pre-wrap">
      <span className="text-xl">{categoryIcon(need.category)}</span>
      {need.aiAppraisal}
    </p>
  </section>
)}

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex gap-3">
        <form action={addBoost.bind(null, need.id)}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm font-medium"
          >
            Boost
          </button>
        </form>

        <form action={generateListing.bind(null, need.id)}>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-sm font-medium"
          >
            Generate Listing
          </button>
        </form>
      </div>
    </article>
  );
}