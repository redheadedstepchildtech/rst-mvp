'use server';

import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function aiSuggestTitle(needType: string) {
  const prompt = `
Suggest a short, clear, dignified title for a need of type: ${needType}.
Return only the title, no explanation.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

export async function aiSuggestCategory(title: string) {
  const prompt = `
Given this need title: "${title}"
Suggest the most appropriate category.
Return only the category name.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

export async function aiGenerateStory(title: string, needType: string) {
  const prompt = `
Write a short, warm, dignified story explaining why someone might need help with:
Title: ${title}
Type: ${needType}

Keep it under 120 words.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}