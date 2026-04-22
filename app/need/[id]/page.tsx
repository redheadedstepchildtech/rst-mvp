import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const isAdmin = cookies().get("rst_admin")?.value === "true";

export default async function NeedDetailPage({ params }) {
  const need = await prisma.need.findUnique({
    where: { id: params.id },
  });

await prisma.need.update({
  where: { id: params.id },
  data: { views: { increment: 1 } },
});

export const metadata = {
  openGraph: {
    title: "RST Need",
    description: "A community need posted on RST",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RST Need",
    description: "A community need posted on RST",
    images: ["/og-default.png"],
  },
};

<div className={`text-sm ${theme.accent}`}>
  <div>Boosts: {need.boostCount}</div>
  {need.boostType && <div>Last Boost: {need.boostType}</div>}
</div>

{isAdmin && (
  <Link href={`/admin/edit/${need.id}`} className="text-blue-600 underline">
    Edit
  </Link>
)}

views Int @default(0)

const relatedNeeds = await prisma.need.findMany({
  where: {
    id: { not: need.id },
    OR: [
      { category: need.category },
      { type: need.type },
      { city: need.city },
      { state: need.state },
      {
        tags: {
          contains: need.tags ? need.tags.split(",")[0] : "",
          mode: "insensitive",
        },
      },
    ],
  },
  orderBy: [
    { lastBoostedAt: "desc" },
    { boostCount: "desc" },
    { createdAt: "desc" },
  ],
  take: 6,
});

<Link
  href={`/dashboard?category=${need.category}`}
  className="inline-block mt-4 text-blue-600 hover:underline text-sm"
>
  View more in {need.category}
</Link>

const THEMES = {
  story: {
    bg: "bg-gray-50",
    text: "text-gray-800",
    border: "border-gray-300",
    accent: "text-gray-600",
  },
  donation: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-300",
    accent: "text-amber-700",
  },
  "help-offer": {
    bg: "bg-green-50",
    text: "text-green-900",
    border: "border-green-300",
    accent: "text-green-700",
  },
  swap: {
    bg: "bg-blue-50",
    text: "text-blue-900",
    border: "border-blue-300",
    accent: "text-blue-700",
  },
  resource: {
    bg: "bg-purple-50",
    text: "text-purple-900",
    border: "border-purple-300",
    accent: "text-purple-700",
  },
  announcement: {
    bg: "bg-orange-50",
    text: "text-orange-900",
    border: "border-orange-300",
    accent: "text-orange-700",
  },
};

  if (!need) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Need not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{need.title}</h1>

      {need.photoUrl && (
        <img
          src={need.photoUrl}
          alt="Need photo"
          className="rounded-lg border"
        />
      )}
<img
  src={need.photoUrl}
  alt="Need photo"
  className={`rounded-lg border ${theme.border}`}
/>

      <div className="text-gray-700 whitespace-pre-wrap">
        {need.description}
      </div>

      {need.needs && (
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Needs</h2>
          <p className="whitespace-pre-wrap">{need.needs}</p>
        </div>
      )}

      <div className={`max-w-2xl mx-auto p-6 space-y-6 ${theme.bg} ${theme.text}`}>
        <div>Type: {need.type}</div>
        <div>Category: {need.category}</div>
        <div>Location: {need.city}, {need.state} {need.zip}</div>
      </div>

      {need.qrUrl && (
        <div className="pt-4">
          <img src={need.qrUrl} alt="QR Code" className="w-40 h-40" />
        </div>
      )}

{relatedNeeds.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-bold mb-4">Related Needs</h2>

    <div className="space-y-4">
      {relatedNeeds.map((r) => (
        <Link
          key={r.id}
          href={`/need/${r.id}`}
          className="block p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="font-semibold">{r.title}</div>
          <div className="text-sm text-gray-600">
            {r.city}, {r.state}
          </div>
          <div className="text-xs text-gray-500">
            {r.category} • {r.type}
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

<div className="pt-4 space-x-2">
  <button
    onClick={async () => {
      await fetch("/api/boost", {
        method: "POST",
        body: JSON.stringify({ id: need.id, type: "visibility" }),
      });
      location.reload();
    }}
    className="px-3 py-2 bg-blue-600 text-white rounded"
  >
    Visibility Boost
  </button>

  <button
    onClick={async () => {
      await fetch("/api/boost", {
        method: "POST",
        body: JSON.stringify({ id: need.id, type: "urgency" }),
      });
      location.reload();
    }}
    className="px-3 py-2 bg-red-600 text-white rounded"
  >
    Urgency Boost
  </button>

  <button
    onClick={async () => {
      await fetch("/api/boost", {
        method: "POST",
        body: JSON.stringify({ id: need.id, type: "dignity" }),
      });
      location.reload();
    }}
    className="px-3 py-2 bg-purple-600 text-white rounded"
  >
    Dignity Boost
  </button>
</div>

<div className="pt-6 space-y-3">

  {/* Native Share */}
  <button
    onClick={async () => {
      if (navigator.share) {
        await navigator.share({
          title: need.title,
          text: "Check out this need on RST",
          url: window.location.href,
        });
      } else {
        alert("Sharing not supported on this device");
      }
    }}
    className="px-4 py-2 bg-indigo-600 text-white rounded w-full"
  >
    Share (Native)
  </button>

  {/* Facebook */}
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    className="block px-4 py-2 bg-blue-600 text-white rounded text-center"
  >
    Share on Facebook
  </a>

  {/* Messenger */}
  <a
    href={`fb-messenger://share/?link=${encodeURIComponent(window.location.href)}`}
    className="block px-4 py-2 bg-blue-500 text-white rounded text-center"
  >
    Share on Messenger
  </a>

  {/* SMS */}
  <a
    href={`sms:?body=${encodeURIComponent("Check out this need: " + window.location.href)}`}
    className="block px-4 py-2 bg-green-600 text-white rounded text-center"
  >
    Share via SMS
  </a>

  {/* Email */}
  <a
    href={`mailto:?subject=${encodeURIComponent("Check out this Need")}&body=${encodeURIComponent(window.location.href)}`}
    className="block px-4 py-2 bg-gray-700 text-white rounded text-center"
  >
    Share via Email
  </a>

  {/* Reddit */}
  <a
    href={`https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(need.title)}`}
    target="_blank"
    className="block px-4 py-2 bg-orange-600 text-white rounded text-center"
  >
    Share on Reddit
  </a>

  {/* Nextdoor */}
  <a
    href={`https://nextdoor.com/share?url=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    className="block px-4 py-2 bg-green-700 text-white rounded text-center"
  >
    Share on Nextdoor
  </a>

  {/* Copy Link */}
  <button
    onClick={() => navigator.clipboard.writeText(window.location.href)}
    className="px-4 py-2 bg-black text-white rounded w-full"
  >
    Copy Link
  </button>

</div>

    </div>
  );
}