export default function UpgradeModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">

        <h2 className="text-xl font-bold text-gray-900">Upgrade Required</h2>

        <p className="text-gray-700">{message}</p>

        <div className="flex flex-col gap-2">
          <a
            href="/rst2/subscribe/manage"
            className="px-4 py-2 bg-purple-700 text-white rounded-md text-center hover:bg-purple-800"
          >
            View Plans
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}