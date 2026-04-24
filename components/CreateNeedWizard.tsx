"use client";

import { useState } from "react";

const CATEGORY_ICONS: Record<string, string> = {
  Housing: "🏠",
  Food: "🍎",
  Medical: "🚑",
  Transportation: "🚗",
  Clothing: "🧥",
  Utilities: "🔌",
  Other: "📦",
};

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
  const [story, setStory] = useState("");
  const [error, setError] = useState("");

  // Photos stubbed for now
  const [photos] = useState<string[]>([]);

  const totalSteps = 4;

  const next = () => {
    setError("");
    if (step === 1) {
      if (!title || !category) {
        setError("Please provide a title and select a category.");
        return;
      }
    }
    if (step === 2) {
      if (!story.trim()) {
        setError("Please share at least a short story.");
        return;
      }
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const back = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    // MVP: no backend call yet
    console.log("MVP: createNeed disabled", {
      title,
      category,
      isNonprofit,
      orgName,
      ein,
      story,
      photos,
    });
    setError("For this MVP, submitting is disabled. Review flow only.");
  };

  return (
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
        {step === 1 &&
          "Start with the basics so people know what this need is about."}
        {step === 2 &&
          "Share the story behind this need in your own words."}
        {step === 3 &&
          "Photos help people connect. You can add them later if needed."}
        {step === 4 &&
          "Make sure everything looks right before you finish."}
      </p>

      <div className="flex-1 overflow-y-auto space-y-4">
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
          <Step2Story
            story={story}
            setStory={setStory}
            title={title}
            category={category}
            isNonprofit={isNonprofit}
            orgName={orgName}
          />
        )}

        {step === 3 && <Step3Photos photos={photos} />}

        {step === 4 && (
          <Step4Review
            title={title}
            category={category}
            isNonprofit={isNonprofit}
            orgName={orgName}
            ein={ein}
            story={story}
          />
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-3">{error}</p>
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
          <button
            type="button"
            onClick={handleFinish}
            className="flex-1 py-3 rounded-xl bg-emerald-400 text-slate-900 font-extrabold text-lg"
          >
            Finish My Need
          </button>
        )}
      </div>
    </div>
  );
}

type Step1Props = {
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
};

function Step1Basic({
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
}: Step1Props) {
  const categories = [
    "Housing",
    "Food",
    "Medical",
    "Transportation",
    "Clothing",
    "Utilities",
    "Other",
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-slate-200 mb-1">
          Title
        </label>
        <input
          className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-slate-100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short title for this need"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-200 mb-1">
          Category
        </label>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-2 p-3 rounded-lg border text-left ${
                category === cat
                  ? "border-blue-600 bg-blue-50 text-slate-900"
                  : "border-gray-300 text-slate-100 bg-slate-900"
              }`}
            >
              <span>{categoryIcon(cat)}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-slate-200">
          Is this for a nonprofit organization?
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsNonprofit(true)}
            className={`px-3 py-2 rounded-lg border ${
              isNonprofit
                ? "border-emerald-400 bg-emerald-900 text-emerald-100"
                : "border-slate-600 text-slate-200"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setIsNonprofit(false)}
            className={`px-3 py-2 rounded-lg border ${
              !isNonprofit
                ? "border-emerald-400 bg-emerald-900 text-emerald-100"
                : "border-slate-600 text-slate-200"
            }`}
          >
            No
          </button>
        </div>

        {isNonprofit && (
          <div className="space-y-2 mt-2">
            <div>
              <label className="block text-sm text-slate-200 mb-1">
                Organization Name
              </label>
              <input
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-slate-100"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Registered nonprofit name"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-200 mb-1">
                EIN (optional)
              </label>
              <input
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-slate-100"
                value={ein}
                onChange={(e) => setEin(e.target.value)}
                placeholder="00-0000000"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type Step2Props = {
  story: string;
  setStory: (v: string) => void;
  title: string;
  category: string;
  isNonprofit: boolean;
  orgName: string;
};

function Step2Story({
  story,
  setStory,
  title,
  category,
  isNonprofit,
  orgName,
}: Step2Props) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900 rounded-xl p-3 border border-slate-700 text-sm text-slate-200">
        <p className="font-semibold mb-1">What people will see:</p>
        <p className="flex items-center gap-2 mb-1">
          <span>{categoryIcon(category)}</span>
          <span className="font-bold">{title || "Untitled need"}</span>
        </p>
        {isNonprofit && (
          <p className="text-xs text-emerald-300">
            Nonprofit: {orgName || "Organization name not set"}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-200 mb-1">
          Tell the story
        </label>
        <textarea
          className="w-full min-h-[180px] rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-slate-100"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Share what’s going on, who’s affected, and what kind of help is needed."
        />
      </div>
    </div>
  );
}

type Step3Props = {
  photos: string[];
};

function Step3Photos({ photos }: Step3Props) {
  return (
    <div className="space-y-3 text-sm text-slate-200">
      <p>
        Photo uploads are disabled in this MVP, but here’s where they’ll
        appear once we wire them up.
      </p>
      {photos.length === 0 ? (
        <p className="text-slate-400">
          No photos added yet. You’ll be able to add them in a future
          version.
        </p>
      ) : (
        <ul className="list-disc list-inside text-slate-300">
          {photos.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Step4Props = {
  title: string;
  category: string;
  isNonprofit: boolean;
  orgName: string;
  ein: string;
  story: string;
};

function Step4Review({
  title,
  category,
  isNonprofit,
  orgName,
  ein,
  story,
}: Step4Props) {
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
            {ein && (
              <p className="text-slate-400 text-xs">EIN: {ein}</p>
            )}
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
}