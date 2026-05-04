export default function MyDonationsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Donations</h1>

      <p className="text-gray-700">
        Your submitted item donations will appear here in a future update.
      </p>

      <p className="text-gray-600">
        This feature will allow you to track, edit, and manage your donated items once the full donation system is implemented.
      </p>

      <a
        href="/donate-item"
        className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Donate another item
      </a>
    </div>
  );
}