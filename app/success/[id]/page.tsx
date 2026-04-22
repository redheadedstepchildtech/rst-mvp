"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPage({ params }) {
  const { id } = params;

  const [data, setData] = useState<any>(null);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/get-story?id=${id}`);
      const json = await res.json();
      setData(json);

      // Build QR code URL (includes id for analytics)
      const encoded = encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/story/${id}`);
      setQrUrl(`/api/qr?url=${encoded}&id=${id}`);
    }

    load();
  }, [id]);

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center">
        Loading…
      </div>
    );
  }

  const storyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/story/${id}`;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-4">
        Story Created Successfully!
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Your story is live and ready to share.
      </p>

      {/* CATEGORY + TAGS */}
      <div className="mb-6 text-center">
        {data.category && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Category:</span> {data.category}
          </p>
        )}

        {data.tags && data.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {data.tags.slice(0, 10).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* QR CODE */}
      <div className="flex justify-center mb-6">
        <img
          src={qrUrl}
          alt="QR Code"
          className="w-48 h-48 border rounded shadow"
        />
      </div>

      {/* STORY LINK */}
      <div className="text-center mb-6">
        <p className="text-gray-700 mb-2">Your story link:</p>
        <a
          href={storyUrl}
          target="_blank"
          className="text-blue-600 underline break-all"
        >
          {storyUrl}
        </a>
      </div>

      {/* SHARE BUTTONS */}
      <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Share This Story
        </h2>

        <div className="grid grid-cols-2 gap-4 text-center">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}`}
            target="_blank"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Facebook
          </a>

          <a
            href={`https://nextdoor.com/share?url=${encodeURIComponent(storyUrl)}`}
            target="_blank"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nextdoor
          </a>

          <a
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(storyUrl)}`}
            target="_blank"
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Reddit
          </a>

          <a
            href={`mailto:?subject=Please help ${encodeURIComponent(
              data.name
            )}&body=Read their story here: ${storyUrl}`}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Email
          </a>
        </div>

        {/* COPY LINK */}
        <button
          onClick={() => navigator.clipboard.writeText(storyUrl)}
          className="mt-6 w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Copy Story Link
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-10 flex flex-col gap-4">
        <Link
          href="/browse"
          className="w-full text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Browse Other Stories
        </Link>

        <Link
          href="/"
          className="w-full text-center px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Return to Main Site
        </Link>
      </div>

      {/* BRANDING */}
      <div className="mt-10 text-center text-sm text-gray-500">
        Powered by Redheaded Stepchild Tech
      </div>
    </div>
  );
}