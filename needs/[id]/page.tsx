import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function NeedPage({ params }) {
  const { id } = params;

  const need = await prisma.need.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          needs: {
            where: { NOT: { id } },
            orderBy: { createdAt: "desc" },
            take: 5,
          },
        },
      },
      boosts: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!need) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Need not found</h1>
        <p className="text-gray-600 mt-2">
          This listing may have been removed or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">

      {/* Back to Feed */}
      <Link
        href="/rst/feed"
        className="inline-block mb-4 text-blue-600 underline text-sm"
      >
        ← Back to Feed
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{need.title}</h1>

      {/* Posted By */}
      <p className="text-gray-600 text-sm mb-2">
        Posted by {need.user?.phone || "Unknown user"}
      </p>

      {/* Last Updated */}
      <p className="text-gray-500 text-sm mb-4">
        Last updated on{" "}
        {new Date(need.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Category */}
      {need.category && (
        <span className="inline-block bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
          {need.category}
        </span>
      )}

      {/* Verified Nonprofit */}
      {need.verified && (
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-4 ml-2">
          Verified Nonprofit
        </span>
      )}

      {/* Photo Gallery */}
      {need.photos?.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {need.photos.map((url) => (
            <img
              key={url}
              src={url}
              alt="Need photo"
              className="rounded-lg object-cover w-full h-48"
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 text-gray-500 p-6 rounded mb-6 text-center">
          No photos uploaded
        </div>
      )}

      {/* Story */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Story</h2>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {need.story || "No story provided."}
        </p>
      </div>

      {/* Boost Counters */}
      <div className="mb-6 flex gap-4 text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          Visibility: {need.visibilityBoost}
        </span>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
          Urgency: {need.urgencyBoost}
        </span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          Dignity: {need.dignityBoost}
        </span>
      </div>

      {/* Boost CTA */}
      <Link
        href={`/rst/needs/${need.id}/boost`}
        className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg font-semibold mb-6"
      >
        Boost This Need
      </Link>

      {/* Share Button */}
      <ShareButton title={need.title} />

      {/* More From This User */}
      {need.user?.needs?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">More from this user</h2>

          <div className="space-y-3">
            {need.user.needs.map((other) => (
              <div
                key={other.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-1">{other.title}</h3>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {other.story || "No story provided."}
                </p>

                <Link
                  href={`/rst/needs/${other.id}`}
                  className="text-blue-600 text-sm underline"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Photo */}
      <Link
        href={`/rst/report-photo?needId=${need.id}`}
        className="block text-center text-sm text-red-600 mt-8"
      >
        Report a Photo
      </Link>
    </main>
  );
}

/* Client-side Share Button */
function ShareButton({ title }) {
  return (
    <button
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title,
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard");
        }
      }}
      className="w-full bg-gray-200 text-gray-800 py-2 rounded mb-4"
    >
      Share
    </button>
  );
}