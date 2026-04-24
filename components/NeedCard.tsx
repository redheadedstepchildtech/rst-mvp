import Link from "next/link";

export default function NeedCard({ need }: { need: any }) {
  return (
    <Link href={`/need/${need.id}`}>
      <div className="rounded-xl bg-slate-800 p-4 border border-slate-700 hover:border-emerald-400 transition">
        <h2 className="text-lg font-bold text-white mb-1">{need.title}</h2>
        <p className="text-slate-300 text-sm mb-2">{need.category}</p>

        <p className="text-slate-400 text-xs">
          {need.story?.slice(0, 120) || "No story available."}
        </p>
      </div>
    </Link>
  );
}