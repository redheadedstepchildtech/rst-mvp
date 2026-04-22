export default function LegacyPlan() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border space-y-6">

        <a
          href="/rst2/admin/video-library"
          className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          ← Back to Video Library
        </a>

        <h1 className="text-3xl font-bold text-gray-900">Legacy Vault — $20/mo</h1>
        <p className="text-gray-600">
          Preserve your life stories for generations with our most powerful plan.
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Unlimited videos</li>
          <li>Unlimited length</li>
          <li>Family access (invite up to 5 people)</li>
          <li>Private vault mode</li>
          <li>AI cleanup + enhancement</li>
          <li>Automatic captions</li>
        </ul>

        <form action="/rst2/subscribe/update" method="POST">
  <input type="hidden" name="tier" value="legacy" />
  <button
    type="submit"
    className="block w-full text-center px-4 py-2 bg-purple-800 text-white rounded-md font-semibold hover:bg-purple-900"
  >
    Upgrade to Legacy Vault
  </button>
</form>
    </div>
  );
}