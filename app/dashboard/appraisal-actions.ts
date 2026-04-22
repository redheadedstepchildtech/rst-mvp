'use server';

import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

export async function generateAppraisal(needId: string) {
  // Fetch the need
  const need = await prisma.need.findUnique({
    where: { id: needId },
  });

  if (!need) {
    throw new Error("Need not found");
  }

  // Build a structured prompt
  const prompt = `
You are an appraisal engine. Analyze the following need and return a JSON object with:

- "summary": a 2–3 sentence overview
- "valueAssessment": your estimate of cost reasonableness
- "riskFlags": an array of potential risks
- "recommendations": 2–4 practical next steps

Need:
Title: ${need.title}
Type: ${need.needType}
Amount: ${need.amount || "N/A"}
Category: ${need.category || "N/A"}
Why: ${need.why || "N/A"}
Story: ${need.story || "N/A"}

Return ONLY valid JSON.
  `;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const appraisal = response.choices[0].message.content;

  // Save to DB
  await prisma.need.update({
    where: { id: needId },
    data: { appraisal },
  });
}