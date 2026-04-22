export default function PremiumPlan() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border space-y-6">

        <a
          href="/rst2/admin/video-library"
          className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          ← Back to Video Library
        </a>

        <h1 className="text-3xl font-bold text-gray-900">Premium Plan — $10/mo</h1>
        <p className="text-gray-600">
          Unlimited videos and enhanced features for storytellers.
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Unlimited video uploads</li>
          <li>Up to 5 minutes per video</li>
          <li>Automatic thumbnails</li>
          <li>Automatic captions (coming soon)</li>
          <li>AI noise cleanup (coming soon)</li>
        </ul>

        <form action="/rst2/subscribe/update" method="POST">
  <input type="hidden" name="tier" value="premium" />
  <button
    type="submit"
    className="block w-full text-center px-4 py-2 bg-purple-700 text-white rounded-md font-semibold hover:bg-purple-800"
  >
    Upgrade to Premium
  </button>
</form>
    </div>
  );
}