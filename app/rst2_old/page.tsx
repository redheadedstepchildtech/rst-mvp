import Link from "next/link";

export default function RST2Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold mb-6">RST 2.0</h1>

      <div className="space-y-4">

        <Link
          href="/rst2/stories"
          className="block border rounded-md p-4 shadow-sm hover:shadow-md transition"
        >
          📖 Stories
        </Link>

        <Link
          href="/rst2/forms"
          className="block border rounded-md p-4 shadow-sm hover:shadow-md transition"
        >
          📝 Form Filler Outer
        </Link>

        <Link
          href="/rst2/donations/create"
          className="block border rounded-md p-4 shadow-sm hover:shadow-md transition"
        >
          ❤️ Create Donation
        </Link>

        <Link
          href="/rst2/dashboard"
          className="block border rounded-md p-4 shadow-sm hover:shadow-md transition"
        >
          📊 Dashboard
        </Link>

      </div>

    </main>
  );
}