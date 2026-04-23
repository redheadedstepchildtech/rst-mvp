import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const prompt = `
Provide a short, clear, human summary of the following text.
Keep it simple, warm, and easy to understand.
Do not add details or change meaning.

Text:
${text}
    `;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const summary = response.output_text || text;

    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json(
      { error: "AI summary failed" },
      { status: 500 }
    );
  }
}