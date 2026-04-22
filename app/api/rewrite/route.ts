import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const [improvedStory, setImprovedStory] = useState("");
const [showImproved, setShowImproved] = useState(false);
const handleRewrite = async () => {
  const res = await fetch("/api/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ story }),
  });

  const data = await res.json();
  if (data.improved) {
    setImprovedStory(data.improved);
    setShowImproved(true);
  }
};

export async function POST(req: Request) {
  try {
    const { story } = await req.json();

    if (!story) {
      return NextResponse.json({ error: "Missing story" }, { status: 400 });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: `
Rewrite the story below so it is warm, human, simple, and dignified.

Rules:
- Keep it first-person.
- Keep the meaning the same.
- Do NOT add details.
- Do NOT dramatize.
- Do NOT use pity language.
- Do NOT use corporate tone.
- Do NOT make it sound like a charity pitch.
- Keep sentences short and clear.
- Keep the emotional tone gentle and grounded.
- Keep the person’s dignity at the center.

Story:
{{story}}
      `,
    });

    const cleaned =
      response.output_text || response.output[0]?.content[0]?.text || story;

    return NextResponse.json({ cleaned });
  } catch (err) {
    return NextResponse.json(
      { error: "AI rewrite failed" },
      { status: 500 }
    );
  }
}