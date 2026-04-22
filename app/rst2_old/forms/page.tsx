export default function FormsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <h1 className="text-2xl font-bold mb-6">Form Filler Outer</h1>

      <div className="space-y-4">

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Available Tools</h2>
          <p className="text-gray-700">
            This section will contain your form‑filling tools, helpers, and templates.
          </p>
        </div>

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">All Forms</h2>
          <p className="text-gray-700 mb-2">
            Browse every form available in the system.
          </p>
          <a
            href="/rst2/forms/all"
            className="text-blue-600 hover:underline text-sm"
          >
            View All Forms →
          </a>
        </div>

      </div>

    </main>
  );
}