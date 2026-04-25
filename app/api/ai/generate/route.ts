import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.AZURE_OPENAI_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;

    if (!apiKey || !endpoint) {
      return NextResponse.json(
        { error: "Missing Azure OpenAI credentials" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL: endpoint,
    });

    const body = await req.json();

    const prompt = `
      Create a helpful listing for a community donation or sale.
      Title: ${body.title}
      Need Type: ${body.needType}
      Amount: ${body.amount}
      Why: ${body.why}
      Story: ${body.story}
      Category: ${body.category}

      Provide:
      1. A better title
      2. A polished story
      3. A short summary
      4. A price appraisal (low, average, high)
    `;

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const text = completion.output_text;

    return NextResponse.json({ ai: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}