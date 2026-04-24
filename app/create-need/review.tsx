import Link from "next/link";
import { createNeed } from "./actions";

export default function ReviewPage({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <div>
      <Link
        href={`/create-need/step3?${new URLSearchParams(searchParams).toString()}`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      {/* Your review UI goes here */}
    </div>
  );
}