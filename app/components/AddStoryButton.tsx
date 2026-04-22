"use client";

import Link from "next/link";

export default function AddStoryButton() {
  return (
    <Link
      href="/rst2/stories/new"
      className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
    >
      Add New Story
    </Link>
  );
}