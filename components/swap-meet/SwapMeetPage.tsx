import { useEffect, useState } from "react";
import SwapMeetList from "./SwapMeetList";
import SwapMeetFilters from "./SwapMeetFilters";
import SwapMeetEmpty from "./SwapMeetEmpty";
import { Donation } from "@/types";

export default function SwapMeetPage() {
  const [items, setItems] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder fetch
    fetch("/api/donations")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="swap-container">
      <h1 className="text-2xl font-bold mb-4">Swap‑Meet</h1>

      <SwapMeetFilters />

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <SwapMeetEmpty />
      ) : (
        <SwapMeetList items={items} />
      )}
    </div>
  );
}