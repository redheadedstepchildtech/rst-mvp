"use client";

import { useEffect, useState } from "react";

export default function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading analytics...</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Admin Analytics Dashboard</h1>

      {/* Totals */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">{data.totalNeeds}</h2>
          <p className="text-sm text-gray-600">Total Needs</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">{data.totalBoosts}</h2>
          <p className="text-sm text-gray-600">Total Boosts</p>
        </div>
      </section>

      {/* Needs by Category */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Needs by Category</h2>
        <div className="space-y-2">
          {data.needsByCategory.map((c) => (
            <div key={c.category} className="p-3 bg-white shadow rounded">
              <strong>{c.category || "Uncategorized"}</strong>: {c._count.category}
            </div>
          ))}
        </div>
      </section>

      {/* Needs by City */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Needs by City</h2>
        <div className="space-y-2">
          {data.needsByCity.map((c) => (
            <div key={c.city} className="p-3 bg-white shadow rounded">
              <strong>{c.city || "Unknown"}</strong>: {c._count.city}
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Trending (Last 7 Days)</h2>
        <div className="space-y-2">
          {data.trending.map((n) => (
            <div key={n.id} className="p-3 bg-white shadow rounded">
              <strong>{n.title}</strong> — {n.boostCount} boosts
            </div>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Recently Added</h2>
        <div className="space-y-2">
          {data.recent.map((n) => (
            <div key={n.id} className="p-3 bg-white shadow rounded">
              <strong>{n.title}</strong> — {new Date(n.createdAt).toLocaleString()}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
