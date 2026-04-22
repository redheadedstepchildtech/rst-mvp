import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { story } = await req.json();

  const prompt = `
Rewrite the story below in a simpler, shorter, clearer way.

Rules:
- Keep it first-person.
- Keep the meaning the same.
- Do NOT add details.
- Use short sentences.
- Use simple words.
- Keep it warm and human.
- Keep it dignified.
- No pity language.
- No dramatic tone.
- No corporate tone.
- Aim for a 3rd–5th grade reading level.

Story:
${story}
`;

  // Call your AI model here
  const simplified = await runAI(prompt); // replace with your model call

  return NextResponse.json({ simplified });
}