export default function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <h1>Your Dashboard</h1>

      <a href="/create-donation">
        <button className="create-btn">+ Create Donation</button>
      </a>
    </div>
  );
}