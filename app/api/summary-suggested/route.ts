import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { story } = await req.json();

  const prompt = `
Rewrite the story below as a second option for a one-sentence summary.

Rules:
- First-person.
- 12–20 words.
- Warm and simple.
- No added details.
- No drama.
- No pity language.
- No corporate tone.
- Keep it human and grounded.
- Make it different from the first summary.

Story:
${story}
`;

  const summary = await runAI(prompt); // replace with your model call

  return NextResponse.json({ summary });
}