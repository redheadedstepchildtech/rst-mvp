import { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import DonationList from "./DonationList";
import EmptyState from "./EmptyState";

export default function DashboardView() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder for future backend call
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setDonations([]); // Start empty
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader />

      {loading ? (
        <p>Loading...</p>
      ) : donations.length === 0 ? (
        <EmptyState />
      ) : (
        <DonationList donations={donations} />
      )}
    </div>
  );
}