export default function SwapMeetFilters() {
  return (
    <div className="flex gap-4 mb-4">
      <select className="border p-2 rounded">
        <option value="">All Categories</option>
        <option value="item">Items</option>
        <option value="service">Services</option>
        <option value="support">Support</option>
        <option value="other">Other</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded flex-1"
      />
    </div>
  );
}