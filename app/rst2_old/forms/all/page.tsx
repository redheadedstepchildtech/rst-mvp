export default function AllFormsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <a
        href="/rst2/forms"
        className="inline-block mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to Forms
      </a>

      <h1 className="text-2xl font-bold mb-6">All Forms</h1>

      <div className="space-y-4">

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Form 1</h2>
          <p className="text-gray-700">
            Description of this form goes here.
          </p>
        </div>

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Form 2</h2>
          <p className="text-gray-700">
            Description of this form goes here.
          </p>
        </div>

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Form 3</h2>
          <p className="text-gray-700">
            Description of this form goes here.
          </p>
        </div>

      </div>

    </main>
  );
}