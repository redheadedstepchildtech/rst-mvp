import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { story } = await req.json();

  const prompt = `
Rewrite the story below as a 2–3 word warm, simple, dignified summary.

Rules:
- 2–3 words only.
- No drama.
- No pity language.
- No corporate tone.
- No added details.
- Keep it human and grounded.
- Focus on hope, effort, or direction.

Story:
${story}
`;

  const micro = await runAI(prompt); // replace with your model call

  return NextResponse.json({ micro });
}