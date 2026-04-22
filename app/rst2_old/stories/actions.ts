"use server";

import fs from "fs";
import path from "path";

type NewStoryInput = {
  title: string;
  summary: string;
  content: string;
  tags: string;
  thumbnail: string;
  category: string;
};

export async function createStory(formData: FormData) {
 export async function updateStory(formData: FormData) {
  const id = String(formData.get("id"));
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const tags = String(formData.get("tags") || "").trim();
  const thumbnail = String(formData.get("thumbnail") || "").trim();
  const category = String(formData.get("category") || "").trim();

  const filePath = path.join(process.cwd(), "data", "stories", `${id}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error("Story not found.");
  }

  const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const updated = {
    ...existing,
    title,
    summary,
    content,
    tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    thumbnail: thumbnail || null,
    category: category || null,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");

  return { id };
}

  const files = fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => parseInt(f.replace(".json", ""), 10))
    .filter((n) => !Number.isNaN(n));

  const nextId = files.length === 0 ? 1 : Math.max(...files) + 1;

  const story = {
    id: nextId,
    title,
    summary,
    content,
    tags: tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    thumbnail: thumbnail || null,
    category: category || null,
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(dataDir, `${nextId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), "utf-8");

  return { id: nextId };
}