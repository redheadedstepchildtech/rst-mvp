export default function StatusPage() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">System Status</h1>

      <ul className="space-y-2 text-gray-700">
        <li><strong>Version:</strong> v1.0.0</li>
        <li><strong>API:</strong> Online</li>
        <li><strong>Database:</strong> Online</li>
        <li><strong>Last Deploy:</strong> April 2026</li>
      </ul>

      <p className="text-gray-500 text-sm">
        All systems operational. Future updates will appear here.
      </p>
    </div>
  );
}
