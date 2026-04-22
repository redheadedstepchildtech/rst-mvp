"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createStory } from "../actions";

export default function NewStoryPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await createStory(formData);
        router.push(`/rst2/story/${result.id}`);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      }
    });
  };

  return (
    <main className="px-6 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Story</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="summary">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={2}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="content">
            Full Story *
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="Family, Work, Childhood..."
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="grandma, holidays, Montana"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
            Thumbnail URL
          </label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save Story"}
          </button>
        </div>
      </form>
    </main>
  );
}