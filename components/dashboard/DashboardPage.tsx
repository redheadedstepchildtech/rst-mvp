import { useEffect, useState } from "react";
import DashboardList from "./DashboardList";
import DashboardEmpty from "./DashboardEmpty";
import { Donation, HelpOffer } from "@/types";

export default function DashboardPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [helpOffers, setHelpOffers] = useState<HelpOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const d = await fetch("/api/donations").then((r) => r.json());
      const h = await fetch("/api/help-offers").then((r) => r.json());

      // Filter by user until auth is added
      const userId = "temp-user";

      setDonations(d.filter((x: Donation) => x.userId === userId));
      setHelpOffers(h.filter((x: HelpOffer) => x.userId === userId));

      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  const total = donations.length + helpOffers.length;

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>

      {total === 0 ? (
        <DashboardEmpty />
      ) : (
        <DashboardList donations={donations} helpOffers={helpOffers} />
      )}
    </div>
  );
}