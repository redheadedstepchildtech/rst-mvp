import Link from "next/link";

export default function PublicNav() {
  return (
    <nav className="w-full p-4 bg-white border-b mb-6">
      <Link href="/search">Find Needs</Link>
      <div className="max-w-3xl mx-auto flex gap-6 text-lg font-semibold">
        <a href="/rst" className="hover:underline">Home</a>
        <a href="/rst/create" className="hover:underline">Create Donation</a>
      </div>
    </nav>
  );
}