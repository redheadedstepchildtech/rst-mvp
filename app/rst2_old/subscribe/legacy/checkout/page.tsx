export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-sm border text-center space-y-4">
        <h1 className="text-2xl font-bold">Checkout Coming Soon</h1>
        <p className="text-gray-600">
          Stripe integration will be added in the next phase.
        </p>
        <a
          href="/rst2/admin/video-library"
          className="inline-block px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ← Back to Video Library
        </a>
      </div>
    </div>
  );
}