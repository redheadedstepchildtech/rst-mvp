"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import PrintCardButton from "@/components/PrintCardButton";
import ShareCardButton from "@/components/ShareCardButton";
import DownloadCardPNG from "@/components/DownloadCardPNG";
import BrowseStoriesButton from "@/components/BrowseStoriesButton";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const id = searchParams.get("id");

  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(url || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-xl mx-auto text-center py-10 px-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">
        Your Donation Minisite is Ready!
      </h1>

      <p className="text-gray-700 mb-6">
        Share this link or print a donation card to help spread the word.
      </p>

      {/* QR CODE */}
      {url && (
        <img
          src={`/api/qr?url=${encodeURIComponent(url)}`}
          alt="QR Code"
          className="mx-auto mb-6 w-48 h-48"
        />
      )}

      {/* SHARE LINK */}
      {url && (
        <p className="text-blue-600 underline break-all mb-4">
          {url}
        </p>
      )}

      {/* COPY BUTTON */}
      <button
        onClick={copyLink}
        className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800 mb-8"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>

      {/* ACTION AREA */}
      <div className="mt-10 space-y-10">

        {/* PRINT DONATION CARD */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Print Donation Card</h2>
          <PrintCardButton id={id || ""} />
        </div>

        {/* SHARE THIS STORY */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Share This Story</h2>
          <ShareCardButton id={id || ""} />
        </div>

        {/* VIEW CARD FORMATS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">View Your Card Formats</h2>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">

            <Link
              href={`/card/${id}/business`}
              className="px-4 py-3 bg-gray-100 rounded shadow text-center hover:bg-gray-200"
            >
              Business Card
            </Link>

            <Link
              href={`/card/${id}/half`}
              className="px-4 py-3 bg-gray-100 rounded shadow text-center hover:bg-gray-200"
            >
              Half‑Page Flyer
            </Link>

            <Link
              href={`/card/${id}/full`}
              className="px-4 py-3 bg-gray-100 rounded shadow text-center hover:bg-gray-200"
            >
              Full‑Page Flyer
            </Link>

            <Link
              href={`/card/${id}/social`}
              className="px-4 py-3 bg-gray-100 rounded shadow text-center hover:bg-gray-200"
            >
              Social Media Card
            </Link>

          </div>
        </div>

        {/* DOWNLOAD PNG */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Download as PNG</h2>
          <DownloadCardPNG id={id || ""} />
        </div>

        {/* BROWSE OTHER STORIES */}
        <div>
          <BrowseStoriesButton />
        </div>

      </div>
    </div>
  );
}