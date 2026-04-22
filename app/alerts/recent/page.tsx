import prisma from "@/lib/prisma";

export default async function RecentAlertsPage() {
  // Fetch alerts with urgent ones first
  const alerts = await prisma.alert.findMany({
    orderBy: [
      { urgent: "desc" },
      { createdAt: "desc" }
    ]
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recent Alerts</h1>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border rounded p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{alert.title}</h2>

              {alert.urgent && (
                <span className="px-2 py-1 text-xs bg-red-600 text-white rounded">
                  URGENT
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-2">{alert.message}</p>

            <p className="text-xs text-gray-500">
              {new Date(alert.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}