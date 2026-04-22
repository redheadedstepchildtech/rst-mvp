"use client";

import Link from "next/link";

export default function AddStoryButton() {
  return (
    <Link
      href="/rst2/story/create"
      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Add New Story
    </Link>
  );
}