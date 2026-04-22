export default function EmptyState() {
  return (
    <div className="empty-state">
      <h2>No donations yet</h2>
      <p>When you create a donation, it will appear here.</p>

      <a href="/create-donation">
        <button>Create Your First Donation</button>
      </a>
    </div>
  );
}