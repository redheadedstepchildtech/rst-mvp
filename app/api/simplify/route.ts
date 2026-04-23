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
Simplify the following text so it is clear, plain, and easy to understand.
Do not change the meaning.

Text:
${text}
    `;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const simplified = response.output_text || text;

    return NextResponse.json({ simplified });
  } catch (err) {
    return NextResponse.json(
      { error: "AI simplify failed" },
      { status: 500 }
    );
  }
}