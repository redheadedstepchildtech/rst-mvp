"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Step2() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const [text, setText] = useState("");

  useEffect(() => {
    if (!title) {
      router.push("/rst2/memory/record/step1");
    }
  }, [title, router]);

  const handleNext = () => {
    if (!text.trim()) return;
    router.push(
      `/rst2/memory/record/step3?title=${encodeURIComponent(
        title
      )}&text=${encodeURIComponent(text)}`
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Tell Your Story
      </h1>

      <p className="text-lg text-gray-700 mb-6 text-center">
        Write as much or as little as you want. There’s no wrong way to do this.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing your memory here..."
        className="w-full h-64 p-4 text-xl border rounded-lg shadow-sm"
      />

      <div className="flex justify-between mt-8">
        <button
          onClick={() =>
            router.push(`/rst2/memory/record/step1?title=${encodeURIComponent(title)}`)
          }
          className="px-4 py-3 text-lg rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={!text.trim()}
          className={`px-6 py-3 text-lg rounded-lg text-white ${
            text.trim()
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