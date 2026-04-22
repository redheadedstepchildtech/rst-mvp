export default function DashboardPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="space-y-4">

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Your Activity</h2>
          <p className="text-gray-700">
            This section will show your recent actions, boosts, and story updates.
          </p>
        </div>

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Analytics</h2>
          <p className="text-gray-700">
            Charts and insights will appear here once analytics are wired up.
          </p>
        </div>

        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Tools</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Manage Stories</li>
            <li>Manage Forms</li>
            <li>Manage Donations</li>
          </ul>
        </div>

      </div>

    </main>
  );
}