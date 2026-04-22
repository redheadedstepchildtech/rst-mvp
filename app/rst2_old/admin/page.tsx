export default function DonationDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-blue-700">RST</span>
            <span className="text-sm text-gray-500">Donation Dashboard</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/rst2" className="text-gray-700 hover:text-black">
              Home
            </a>
            <a href="/rst2/stories" className="text-gray-700 hover:text-black">
              Stories
            </a>
            <a href="/rst2/swap" className="text-gray-700 hover:text-black">
              Swap-Meet
            </a>

<a
  href="/rst2/admin/video-library"
  className="px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
>
  Video Library
</a>
            <button className="text-gray-500 hover:text-black">Logout</button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Panel */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Welcome back, Myrna</p>
            <p className="text-lg font-semibold text-gray-800">
              Your story has reached <span className="text-blue-700">42 people</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/rst2/story/create"
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md font-semibold hover:bg-blue-700"
            >
              Create New Story
            </a>
            <button className="px-3 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300">
              Record Audio Story
            </button>
            <button className="px-3 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300">
              Upload Video
            </button>
          </div>
        </section>

        {/* Your Stories */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Your Stories</h2>
            <a href="/rst2/stories" className="text-sm text-blue-700 hover:underline">
              View all
            </a>
          </div>

          <div className="space-y-3">
            {/* Story Card (placeholder) */}
            <div className="border rounded-md p-3 sm:p-4 bg-gray-50">
              <p className="font-semibold text-gray-900">Back on the Farm</p>
              <p className="text-sm text-gray-600 mt-1">
                “My granddaughter called the cops on my son…”
              </p>
              <p className="text-xs text-gray-500 mt-1">
                42 views • 6 donors • Created Apr 5, 2026
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-sm">
                <a
                  href="/rst2/story/123"
                  className="px-3 py-1 bg-white border rounded-md hover:bg-gray-100"
                >
                  View
                </a>
                <button className="px-3 py-1 bg-white border rounded-md hover:bg-gray-100">
                  Edit
                </button>
                <button className="px-3 py-1 bg-white border rounded-md hover:bg-gray-100">
                  Share / QR
                </button>
                <button className="px-3 py-1 bg-white border rounded-md hover:bg-gray-100">
                  Analytics
                </button>
              </div>
            </div>

            {/* More story cards will go here later */}
          </div>
        </section>

        {/* Donations Panel */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Donations</h2>
            <p className="text-2xl font-bold text-green-700">$1,240</p>
            <p className="text-sm text-gray-500">Total donations received</p>
            <div className="mt-2 space-y-1 text-sm text-gray-700">
              <p>• Sarah M. — “Thinking of you”</p>
              <p>• Anonymous — “Stay strong”</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 text-sm">
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Download Report
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Thank Donors (AI)
              </button>
            </div>
          </div>

          {/* Video Library */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Video Library</h2>
            <p className="text-sm text-gray-600">
              Free tier: <span className="font-semibold">1</span> video remaining.
            </p>
            <button className="mt-2 px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700">
              Upgrade Plan
            </button>
            <div className="mt-3 flex gap-2 text-xs text-gray-500">
              <div className="w-20 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                Video 1
              </div>
              <div className="w-20 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                Locked
              </div>
              <div className="w-20 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                Locked
              </div>
            </div>
          </div>
        </section>

        {/* Story Tools + Settings */}
        <section className="grid gap-4 md:grid-cols-2">
          {/* Story Tools */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Story Tools</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <a
                href="/rst2/story/create"
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create New Story
              </a>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Record Audio Story
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Record Video Story
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                AI Cleanup
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Improve My Story
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Account & Settings</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Profile
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Payment Methods
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Payout Settings
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Notifications
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Caregiver Access
              </button>
              <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Support
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}