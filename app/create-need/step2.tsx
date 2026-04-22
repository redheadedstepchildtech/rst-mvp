"use client";

import { useState } from "react";
import { generateStory } from "@/app/actions/needActions";

export default function Step2({ story, setStory, title, category, isNonprofit, orgName }) {
  const [loading, setLoading] = useState(false);
  const [aiStory, setAiStory] = useState("");

  async function handleGenerate() {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("nonprofit", isNonprofit ? "true" : "false");
    formData.append("orgName", orgName || "");
    formData.append("existing", story || "");

    const res = await generateStory(formData);
    setAiStory(res.story);
    setLoading(false);
  }

  function useAiStory() {
    setStory(aiStory);
    setAiStory("");
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm mb-1">Story</label>
      {/* TOGGLE BUTTONS */}

{improvedStory && (
  <div className="flex gap-2 mb-3">
    <button
      onClick={() => setShowImproved(false)}
      className={`flex-1 py-2 rounded-lg font-semibold ${
        !showImproved
          ? "bg-gray-800 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
<textarea
  value={showImproved ? improvedStory : story}
  onChange={(e) => {
    if (showImproved) {
      setImprovedStory(e.target.value);
    } else {
      setStory(e.target.value);
    }
  }}

{improvedStory && (
  <button
    onClick={handleRewriteAgain}
    className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg font-semibold"
  >
    Rewrite Again
  </button>
)}

const handleRewriteAgain = async () => {
  const res = await fetch("/api/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ story }),
  });

<button
  onClick={handleSimplify}
  className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold"
>
  Make It Simpler
</button>

const handleSimplify = async () => {
  const res = await fetch("/api/simplify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ story }),
  });

  const data = await res.json();
  if (data.simplified) {
    setImprovedStory(data.simplified);
    setShowImproved(true);
    runToneCheck(data.simplified);
  }
};

  const data = await res.json();
  if (data.improved) {
    setImprovedStory(data.improved);
    setShowImproved(true);
    runToneCheck(data.improved);
  }
};
  className="w-full h-40 p-3 border rounded-lg"
></textarea>
      Original
    </button>

    <button
      onClick={() => setShowImproved(true)}
      className={`flex-1 py-2 rounded-lg font-semibold ${
        showImproved
          ? "bg-red-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      Improved
    </button>
  </div>
)}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-emerald-400 text-slate-900 font-extrabold text-lg"
      >
        {loading ? "Thinking..." : "Help me write my story"}
      </button>

      {aiStory && (
        <div className="bg-slate-700 p-4 rounded-xl space-y-3">
          <p className="text-slate-200 whitespace-pre-wrap">{aiStory}</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={useAiStory}
              className="flex-1 py-2 rounded-xl bg-emerald-400 text-slate-900 font-bold"
            >
              Use this story
            </button>

            <button
              type="button"
              onClick={() => setAiStory("")}
              className="flex-1 py-2 rounded-xl bg-slate-600 text-white font-bold"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}