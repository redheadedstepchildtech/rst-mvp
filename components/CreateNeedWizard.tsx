"use client";

import { useState } from "react";
import { createNeed } from "@/app/actions/needActions";

const categories = ["Housing", "Food", "Medical", "Transportation", "Other"];

const CATEGORY_ICONS: Record<string, string> = {
  Housing: "🏠",
  Food: "🍎",
  Medical: "🚑",
  Transportation: "🚗",
  Clothing: "🧥",
  Utilities: "🔌",
  Other: "📦",
};

<option value="Housing">🏠 Housing</option>
<option value="Food">🍎 Food</option>
<option value="Medical">🚑 Medical</option>
<option value="Transportation">🚗 Transportation</option>
<option value="Clothing">🧥 Clothing</option>
<option value="Utilities">🔌 Utilities</option>
<option value="Other">📦 Other</option>

function categoryIcon(category?: string) {
  return CATEGORY_ICONS[category ?? "Other"] ?? "📦";
}

<div className="grid grid-cols-2 gap-3">
  {["Housing", "Food", "Medical", "Transportation", "Clothing", "Utilities", "Other"].map(cat => (
    <button
      key={cat}
      type="button"
      onClick={() => setForm({ ...form, category: cat })}
      className={`flex items-center gap-2 p-3 rounded-lg border text-left
        ${form.category === cat ? "border-blue-600 bg-blue-50" : "border-gray-300"}
      `}
    
<p className="flex items-center gap-1">
  <span>{categoryIcon(form.category)}</span>
  {form.category}
</p>

>
    </button>
  ))}
</div>

function categoryIcon(category?: string) {
  return CATEGORY_ICONS[category ?? "Other"] ?? "📦";
}

export default function CreateNeedWizard() {
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isNonprofit, setIsNonprofit] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [ein, setEin] = useState("");
  const [error, setError] = useState("");
  const [story, setStory] = useState("");

  // Photos are stubbed for now; we can wire upload later
  const [photos] = useState<string[]>([]);

  const totalSteps = 4;

const [error, setError] = useState("");
    <div className="bg-slate-800 rounded-2xl p-5 shadow-xl min-h-[520px] flex flex-col">
      {/* Progress */}
      <div className="mb-4">
        <p className="text-sm text-slate-300 mb-1">
          Step {step} of {totalSteps}
        </p>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-emerald-400 h-2 rounded-full transition-all"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">
        {step === 1 && "Basic Info"}
        {step === 2 && "Tell Your Story"}
        {step === 3 && "Photos"}
        {step === 4 && "Review & Finish"}
      </h1>
      <p className="text-sm text-slate-300 mb-4">
        {step === 1 && "Start with the basics so people know what this need is about."}
        {step === 2 && "Share the story behind this need in your own words."}
        {step === 3 && "Photos help people connect. You can add them later if needed."}
        {step === 4 && "Make sure everything looks right before you finish."}
      </p>

      <div className="flex-1 overflow-y-auto">
        {step === 1 && (
          <Step1Basic
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            isNonprofit={isNonprofit}
            setIsNonprofit={setIsNonprofit}
            orgName={orgName}
            setOrgName={setOrgName}
            ein={ein}
            setEin={setEin}
          />
        )}

        {step === 2 && (
  <Step2
    story={story}
    setStory={setStory}
    title={title}
    category={category}
    isNonprofit={isNonprofit}
    orgName={orgName}
  />
)}
        {step === 3 && (
          <Step3Photos photos={photos} />
        )}

const [appraisal, setAppraisal] = useState("");
        {step === 4 && (
          <Step4Review
            title={title}
            category={category}
            isNonprofit={isNonprofit}
            orgName={orgName}
            ein={ein}
            story={story}
<Step4
  title={title}
  category={category}
  story={story}
  appraisal={appraisal}
  setAppraisal={setAppraisal}
<input type="hidden" name="appraisal" value={appraisal} />
/>
          />
        )}
      </div>
{error && (

return (
  <div className="space-y-3 text-sm">

    {/* TITLE */}
    <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
      <p className="text-slate-400">Title</p>
      <p className="font-semibold text-white flex items-center gap-2">
        <span>{categoryIcon(category)}</span>
        {title || "Not set"}
      </p>
    </div>

    {/* CATEGORY */}
    <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
      <p className="text-slate-400">Category</p>
      <p className="font-semibold text-white flex items-center gap-2">
        <span>{categoryIcon(category)}</span>
        {category || "Not set"}
      </p>
    </div>

    {/* NONPROFIT */}
    <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
      <p className="text-slate-400">Nonprofit</p>
      {isNonprofit ? (
        <div className="space-y-1">
          <p className="font-semibold text-emerald-300">Yes</p>
          <p className="text-slate-300">
            {orgName || "Organization name not set"}
          </p>
          {ein && <p className="text-slate-400 text-xs">EIN: {ein}</p>}
        </div>
      ) : (
        <p className="font-semibold text-white">No</p>
      )}
    </div>

    {/* STORY */}
    <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
      <p className="text-slate-400 mb-1">Story</p>
      <p className="text-slate-200 whitespace-pre-wrap">
        {story || "No story provided yet."}
      </p>
    </div>

  </div>
);

  <p className="text-red-400 text-sm mb-2">{error}</p>
)}
      {/* Navigation */}
      <div className="mt-4 flex gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="flex-1 py-3 rounded-xl bg-slate-700 text-slate-100 font-semibold"
          >
            Back
          </button>
        )}

        {step < totalSteps && (
          <button
            type="button"
            onClick={next}
            className="flex-[2] py-3 rounded-xl bg-emerald-400 text-slate-900 font-extrabold text-lg"
          >
            Next
          </button>
        )}

        {step === totalSteps && (
          <form action={createNeed} className="flex-1">
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="category" value={category} />
            <input
              type="hidden"
              name="isNonprofit"
              value={isNonprofit ? "on" : ""}
            />
            <input type="hidden" name="orgName" value={orgName} />
            <input type="hidden" name="ein" value={ein} />
            <input type="hidden" name="story" value={story} />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-400 text-slate-900 font-extrabold text-lg"
            >
              Finish My Need
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Step1Basic(props: {
  title: string;
  setTitle: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  isNonprofit: boolean;
  setIsNonprofit: (v: boolean) => void;
  orgName: string;
  setOrgName: (v: string) => void;
  ein: string;
  setEin: (v: string) => void;
}) {
  const {
    title,
    setTitle,
    category,
    setCategory,
    isNonprofit,
    setIsNonprofit,
    orgName,
    setOrgName,
    ein,
    setEin,
  } = props;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input
          className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-600 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Help with winter heating bill"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-full text-sm font-semibold border ${
                category === c
                  ? "bg-emerald-400 text-slate-900 border-emerald-400"
                  : "bg-slate-900 text-slate-100 border-slate-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

<p className="text-gray-600 flex items-center gap-2">
  <span>{categoryIcon(form.category)}</span>
  {form.category}
</p>

<h3 className="flex items-center gap-2 text-lg font-semibold">
  <span>{categoryIcon(form.category)}</span>
  {form.title}
</h3>

      <div className="mt-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isNonprofit}
            onChange={(e) => setIsNonprofit(e.target.checked)}
          />
          This need is for a nonprofit organization
        </label>
      </div>

      {isNonprofit && (
        <div className="space-y-3 mt-2">
          <div>
            <label className="block text-sm mb-1">Organization Name</label>
            <input
              className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-600 text-white"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Example: Helena Community Shelter"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">EIN (optional)</label>
            <input
              className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-600 text-white"
              value={ein}
              onChange={(e) => setEin(e.target.value)}
              placeholder="12-3456789"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Step2Story(props: { story: string; setStory: (v: string) => void }) {
  const { story, setStory } = props;

  return (
    <div className="space-y-3">
      <label className="block text-sm mb-1">Story</label>
      <textarea
        className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-600 text-white min-h-[180px]"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Share what’s going on, what you need, and how it will help."
      />
      <p className="text-xs text-slate-400">
        You don’t have to be a writer. Just be honest and clear.
      </p>
    </div>
  );
}

function Step3Photos(props: { photos: string[] }) {
  const { photos } = props;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-200">
        Photo upload will go here. For now, you can continue without photos.
      </p>

      {photos.length === 0 ? (
        <div className="border border-dashed border-slate-600 rounded-xl p-4 text-center text-sm text-slate-400">
          No photos added yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((url) => (
            <div
              key={url}
              className="bg-slate-900 rounded-xl h-24 flex items-center justify-center text-xs text-slate-400"
            >
              {url}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Step4Review(props: {
  title: string;
  category: string;
  isNonprofit: boolean;
  orgName: string;
  ein: string;
  story: string;
}) {

const handleSubmit = async () => {
  const payload = {
    title: formData.title,
    category: formData.category,
    description: formData.description,
    photos: formData.photos.map((url) => ({
      id: crypto.randomUUID(),
      url,
    })),
    userId: "temp-user", // placeholder until auth
  };

  const res = await fetch("/api/donations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log("Created donation:", data);
};
  const { title, category, isNonprofit, orgName, ein, story } = props;

  return (
    <div className="space-y-3 text-sm">
      <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
        <p className="text-slate-400">Title</p>
        <p className="font-semibold text-white flex items-center gap-2">
  <span>{categoryIcon(category)}</span>
  {title || "Not set"}
</p>

      </div>

      <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
        <p className="text-slate-400">Category</p>
        <p className="font-semibold text-white flex items-center gap-2">
  <span>{categoryIcon(category)}</span>
  {category || "Not set"}
</p>

      </div>

      <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
        <p className="text-slate-400">Nonprofit</p>
        {isNonprofit ? (
          <div className="space-y-1">
            <p className="font-semibold text-emerald-300">Yes</p>
            <p className="text-slate-300">
              {orgName || "Organization name not set"}
            </p>
            {ein && <p className="text-slate-400 text-xs">EIN: {ein}</p>}
          </div>
        ) : (
          <p className="font-semibold text-white">No</p>
        )}
      </div>

      <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
        <p className="text-slate-400 mb-1">Story</p>
        <p className="text-slate-200 whitespace-pre-wrap">
          {story || "No story provided yet."}
        </p>
      </div>
    </div>
  );
}