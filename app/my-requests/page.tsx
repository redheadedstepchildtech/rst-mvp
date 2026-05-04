export default function MyRequestsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Requests</h1>

      <p className="text-gray-700">
        Your submitted help requests will appear here in a future update.
      </p>

      <p className="text-gray-600">
        This feature is part of the upcoming RST 1.x improvements and will allow you to track, edit, and manage your requests.
      </p>

      <a
        href="/request-help"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit a new request
      </a>
    </div>
  );
}