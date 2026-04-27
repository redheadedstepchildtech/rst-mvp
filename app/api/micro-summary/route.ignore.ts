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
Provide a very short micro-summary of the following text.
Keep it extremely concise, human, and clear.
Do not add details or change meaning.

Text:
${text}
    `;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const microSummary = response.output_text || text;

    return NextResponse.json({ microSummary });
  } catch (err) {
    return NextResponse.json(
      { error: "AI micro-summary failed" },
      { status: 500 }
    );
  }
}