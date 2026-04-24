"use client";

import { useState } from "react";
import DashboardCard from "./DashboardCard";
import { Donation, HelpOffer } from "@/types";

interface Props {
  donations: Donation[];
  helpOffers: HelpOffer[];
}

export default function DashboardList({ donations, helpOffers }: Props) {
  const [items, setItems] = useState({
    donations,
    helpOffers,
  });

  const handleDelete = (id: string) => {
    setItems((prev) => ({
      donations: prev.donations.filter((d) => d.id !== id),
      helpOffers: prev.helpOffers.filter((h) => h.id !== id),
    }));
  };

  const handleUpdate = (updated: Donation | HelpOffer) => {
    setItems((prev) => ({
      donations: prev.donations.map((d) =>
        d.id === updated.id ? (updated as Donation) : d
      ),
      helpOffers: prev.helpOffers.map((h) =>
        h.id === updated.id ? (updated as HelpOffer) : h
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* DONATIONS */}
      {items.donations.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Your Donations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.donations.map((item) => (
              <DashboardCard
                key={item.id}
                item={item}
                type="donation"
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </section>
      )}

      {/* HELP OFFERS */}
      {items.helpOffers.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Your Help Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.helpOffers.map((item) => (
              <DashboardCard
                key={item.id}
                item={item}
                type="help-offer"
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
