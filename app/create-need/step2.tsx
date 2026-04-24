import { useState } from "react";

export default function Step2({ story, setStory, title, category, isNonprofit, orgName }) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <label className="block mb-4">
        <span className="text-sm font-medium">Your Story</span>
        <textarea
          name="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="mt-1 w-full border rounded p-2"
          rows={6}
        />
      </label>

      <button
        type="button"
        className="text-sm text-purple-600 hover:underline"
        disabled={loading}
      >
        Generate Story (coming soon)
      </button>
    </div>
  );
}