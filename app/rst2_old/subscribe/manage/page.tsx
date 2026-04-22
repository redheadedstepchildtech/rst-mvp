import fs from "fs";
import path from "path";

export default function ManageSubscription() {
  const userPath = path.join(process.cwd(), "data", "users", "user123.json");
  const user = JSON.parse(fs.readFileSync(userPath, "utf8"));

  const current = user.subscription;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border space-y-6">

        <a
          href="/rst2/admin/video-library"
          className="inline-block px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          ← Back to Video Library
        </a>

        <h1 className="text-3xl font-bold text-gray-900">Manage Subscription</h1>

        <p className="text-gray-600">
          Your current plan: <span className="font-semibold">{current}</span>
        </p>

        {/* Upgrade Options */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Change Plan</h2>

          <form action="/rst2/subscribe/update" method="POST">
            <input type="hidden" name="tier" value="basic" />
            <button
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Switch to Basic ($5/mo)
            </button>
          </form>

          <form action="/rst2/subscribe/update" method="POST">
            <input type="hidden" name="tier" value="premium" />
            <button
              className="w-full px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
            >
              Switch to Premium ($10/mo)
            </button>
          </form>

          <form action="/rst2/subscribe/update" method="POST">
            <input type="hidden" name="tier" value="legacy" />
            <button
              className="w-full px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900"
            >
              Switch to Legacy Vault ($20/mo)
            </button>
          </form>
        </div>

        {/* Downgrade / Cancel */}
        <div className="pt-4 border-t">
          <h2 className="text-xl font-semibold text-red-700">Cancel or Downgrade</h2>

          <form action="/rst2/subscribe/update" method="POST">
            <input type="hidden" name="tier" value="free" />
            <button
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Switch to Free Plan
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-2">
            You will keep your existing videos, but new uploads will be limited to 1 slot.
          </p>
        </div>
      </div>
    </div>
  );
}