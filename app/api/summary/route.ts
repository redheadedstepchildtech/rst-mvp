import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { story } = await req.json();

  const prompt = `
Rewrite the story below as a single warm, simple, dignified sentence.

Rules:
- First-person.
- 12–20 words.
- No added details.
- No drama.
- No pity language.
- No corporate tone.
- No shame.
- No sensationalism.
- Keep it human and grounded.

Story:
${story}
`;

  const summary = await runAI(prompt); // replace with your model call

  return NextResponse.json({ summary });
}