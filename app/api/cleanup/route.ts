import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { story } = await req.json();

    if (!story || story.trim().length === 0) {
      return NextResponse.json(
        { error: "Story text is required." },
        { status: 400 }
      );
    }

    const prompt = `
Rewrite the following personal story to be clearer, more human, and more dignified.
Do NOT add details that aren't there.
Do NOT make it dramatic.
Keep it first-person.
Keep it honest.
Keep it private and respectful.
Make it flow naturally.

Story:
${story}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const improved = completion.choices[0].message.content;

    return NextResponse.json({ improved });
  } catch (err: any) {
    return NextResponse.json(
      { error: "AI cleanup failed." },
      { status: 500 }
    );
  }
}