"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleNext = () => {
    if (!title.trim()) return;
    router.push(`/rst2/memory/record/step2?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">
        What would you like to call this memory?
      </h1>

      <p className="text-lg text-gray-700 mb-4 text-center">
        A simple title helps future generations find and enjoy your story.
      </p>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Example: My First Car"
        className="w-full p-4 text-xl border rounded-lg mb-6 shadow-sm"
      />

      <div className="flex justify-between mt-8">
        <a
          href="/rst2"
          className="px-4 py-3 text-lg rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ← Back to Home
        </a>

        <button
          onClick={handleNext}
          disabled={!title.trim()}
          className={`px-6 py-3 text-lg rounded-lg text-white ${
            title.trim()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}