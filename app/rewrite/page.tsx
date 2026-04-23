"use client";

import { useState } from "react";

export default function RewritePage() {
  const [story, setStory] = useState("");
  const [improvedStory, setImprovedStory] = useState("");
  const [showImproved, setShowImproved] = useState(false);

  const handleRewrite = async () => {
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story }),
    });

    const data = await res.json();
    if (data.cleaned) {
      setImprovedStory(data.cleaned);
      setShowImproved(true);
    }
  };

  return (
    <div>
      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Paste your story here"
      />

      <button onClick={handleRewrite}>Improve My Story</button>

      {showImproved && (
        <div>
          <h2>Improved Story</h2>
          <p>{improvedStory}</p>
        </div>
      )}
    </div>
  );
}