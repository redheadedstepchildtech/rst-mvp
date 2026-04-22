import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
You are helping a community member create a listing for something they need or are selling.

Write a friendly, clear, human-sounding listing description based on the details below.

Then estimate:
- A low fair price
- A high fair price
- A quick-sale price (what it would likely sell for fast)

Details:
Title: ${body.title}
Type: ${body.needType}
Price: ${body.amount}
Why: ${body.why}
Story: ${body.story}
Category: ${body.category}

Return your answer in this JSON format:

{
  "listing": "string",
  "appraisal": {
    "low": number,
    "high": number,
    "quickSale": number
  }
}
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content || "";

    // Try to parse JSON from the model output
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // fallback if the model didn't return perfect JSON
      parsed = {
        listing: raw,
        appraisal: {
          low: 5,
          high: 20,
          quickSale: 10,
        },
      };
    }

    return NextResponse.json({
      aiListing: parsed.listing,
      appraisal: parsed.appraisal,
    });
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}