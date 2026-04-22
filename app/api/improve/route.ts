import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { story } = await req.json();

    if (!story) {
      return NextResponse.json(
        { error: "No story provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OpenAI API key" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Rewrite the story to be clearer, more human, and more emotionally engaging. Keep it respectful and preserve the original meaning.",
          },
          { role: "user", content: story },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const improved =
      data?.choices?.[0]?.message?.content?.trim() ||
      story + " (AI rewrite failed, showing original)";

    return NextResponse.json({ improved });
  } catch (err) {
    console.error("AI ERROR:", err);
    return NextResponse.json(
      { improved: "(AI rewrite failed, showing original)" },
      { status: 200 }
    );
  }
}