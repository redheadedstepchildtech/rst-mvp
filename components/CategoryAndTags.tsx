"use client";

import { useState } from "react";

const CATEGORIES = [
  "Housing",
  "Food",
  "Medical",
  "Transportation",
  "Family",
  "Emergency",
  "Disability",
  "Veterans",
  "Seniors",
  "Pets",
  "Other",
];

const SUGGESTED_TAGS = [
  "single mom",
  "single dad",
  "grandparent",
  "rent assistance",
  "utilities",
  "car repair",
  "medical bills",
  "job loss",
  "disability",
  "veteran",
  "homeless",
  "eviction",
];

export default function CategoryAndTags({ value, onChange }) {
  const [category, setCategory] = useState(value?.category || "Other");
  const [otherCategory, setOtherCategory] = useState(
    value?.category && !CATEGORIES.includes(value.category)
      ? value.category
      : ""
  );
  const [tags, setTags] = useState<string[]>(value?.tags || []);
  const [tagInput, setTagInput] = useState("");

  function update(newCategory: string, newTags: string[]) {
    onChange({
      category: newCategory,
      tags: newTags,
    });
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setCategory(val);

    if (val !== "Other") {
      setOtherCategory("");
      update(val, tags);
    } else {
      const finalCat = otherCategory || "Other";
      update(finalCat, tags);
    }
  }

  function handleOtherCategoryChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const val = e.target.value;
    setOtherCategory(val);
    const finalCat = category === "Other" ? val || "Other" : category;
    update(finalCat, tags);
  }

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    const newTags = [...tags, trimmed];
    setTags(newTags);
    update(category === "Other" ? otherCategory || "Other" : category, newTags);
  }

  function removeTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    update(category === "Other" ? otherCategory || "Other" : category, newTags);
  }

  function handleTagInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    }
  }

  return (
    <div className="mt-6 space-y-4">
      {/* CATEGORY */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          value={CATEGORIES.includes(category) ? category : "Other"}
          onChange={handleCategoryChange}
          className="w-full border rounded px-3 py-2"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {category === "Other" && (
          <input
            type="text"
            placeholder="Describe your situation (e.g., 'Legal fees', 'Funeral costs')"
            value={otherCategory}
            onChange={handleOtherCategoryChange}
            className="mt-2 w-full border rounded px-3 py-2"
          />
        )}
      </div>

      {/* TAGS */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tags (up to 10)
        </label>

        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 bg-gray-200 rounded-full text-xs"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-gray-600 hover:text-black"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          placeholder="Type a tag and press Enter (e.g., 'single mom')"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className={`px-2 py-1 rounded-full text-xs border ${
                tags.includes(tag)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}