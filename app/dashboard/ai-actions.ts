'use server';

import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

export async function generateListing(needId: string) {
  // Fetch the need
  const need = await prisma.need.findUnique({
    where: { id: needId },
  });

  if (!need) {
    throw new Error("Need not found");
  }

  // Build a simple prompt (we’ll refine later)
  const prompt = `
Generate a clear, human-friendly listing for this need:

Title: ${need.title}
Type: ${need.needType}
Amount: ${need.amount || "N/A"}
Category: ${need.category || "N/A"}
Why: ${need.why || "N/A"}
Story: ${need.story || "N/A"}

Write it in a warm, dignified tone.
  `;

  // Call Azure/OpenAI (placeholder)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const listing = response.choices[0].message.content;

  // Save to DB
  await prisma.need.update({
    where: { id: needId },
    data: { aiListing: listing },
  });
}