export default function SwapmeetPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <a
        href="/"
        className="inline-block mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to Home
      </a>

      <h1 className="text-2xl font-bold mb-6">Swap‑Meet</h1>

      <div className="space-y-4">
        <p className="text-gray-700">
          This section will eventually show community swap items, listings, and tools.
        </p>

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-700">
            Swap listings, item uploads, and community tools will appear here.
          </p>
        </div>
      </div>

    </main>
  );
}