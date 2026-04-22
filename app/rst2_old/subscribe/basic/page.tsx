export default function BasicPlan() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border space-y-6">

        <a
          href="/rst2/admin/video-library"
          className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          ← Back to Video Library
        </a>

        <h1 className="text-3xl font-bold text-gray-900">Basic Plan — $5/mo</h1>
        <p className="text-gray-600">
          A simple plan for users who want more space for memories.
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>5 video slots</li>
          <li>Up to 2 minutes per video</li>
          <li>Automatic thumbnails</li>
          <li>Priority processing</li>
        </ul>

        <form action="/rst2/subscribe/update" method="POST">
  <input type="hidden" name="tier" value="basic" />
  <button
    type="submit"
    className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700"
  >
    Upgrade to Basic
  </button>
</form>
        </a>
      </div>
    </div>
  );
}