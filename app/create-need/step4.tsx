import { useState } from "react";
import { generateAppraisal } from "@/app/actions/needActions";

export default function Step4({ title, category, story, appraisal, setAppraisal }) {
  const [loading, setLoading] = useState(false);
  const [aiAppraisal, setAiAppraisal] = useState("");

  async function handleGenerate() {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("story", story);

    const res = await generateAppraisal(formData);
    setAiAppraisal(res.appraisal);

    setLoading(false);
  }

  function useAppraisal() {
    setAppraisal(aiAppraisal);
    setAiAppraisal("");
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-blue-400 text-slate-900 font-extrabold text-lg"
      >
        {loading ? "Calculating..." : "Generate Appraisal"}
      </button>

      {aiAppraisal && (
        <div className="bg-slate-700 p-4 rounded-xl space-y-3">
          <p className="text-slate-200 whitespace-pre-wrap">{aiAppraisal}</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={useAppraisal}
              className="flex-1 py-2 rounded-xl bg-emerald-400 text-slate-900 font-bold"
            >
              Use this appraisal
            </button>

            <button
              type="button"
              onClick={() => setAiAppraisal("")}
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