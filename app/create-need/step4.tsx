import { useState } from "react";

export default function Step4({ title, category, story, appraisal, setAppraisal }) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <label className="block mb-4">
        <span className="text-sm font-medium">Appraisal (optional)</span>
        <textarea
          name="appraisal"
          value={appraisal}
          onChange={(e) => setAppraisal(e.target.value)}
          className="mt-1 w-full border rounded p-2"
          rows={6}
        />
      </label>

      <button
        type="button"
        className="text-sm text-purple-600 hover:underline"
        disabled={loading}
      >
        Generate Appraisal (coming soon)
      </button>
    </div>
  );
}