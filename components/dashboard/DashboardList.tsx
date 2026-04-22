// DashboardList.tsx
const [items, setItems] = useState({ donations, helpOffers });

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
    helpOffers: prev.helpOffers,
  }));
};

return (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
    {items.donations.map((item) => (
      <DashboardCard
        key={item.id}
        item={item}
        type="donation"
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    ))}

    {items.helpOffers.map((item) => (
      <DashboardCard
        key={item.id}
        item={item}
        type="help-offer"
        onDelete={handleDelete}
      />
    ))}
  </div>
);