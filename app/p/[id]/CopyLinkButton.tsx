"use client";

export default function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(url)}
      className="w-full bg-black text-white py-2 rounded-lg text-center font-semibold"
    >
      Copy Link
    </button>
  );
}
