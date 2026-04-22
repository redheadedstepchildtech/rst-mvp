export default function ViewCardFormats({ id }: { id: string }) {
  return (
    <div className="border rounded-xl p-6 shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">View Card Formats</h2>

      <p className="text-gray-600">
        Choose a format to print or share. Each version includes your QR code and
        automatically adapts to your help request.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <a
          href={`/help/${id}/card/business`}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Business Card</h3>
          <p className="text-sm text-gray-600">
            Small, portable, perfect for handouts or bulletin boards.
          </p>
        </a>

        <a
          href={`/help/${id}/card/half`}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Half‑Page Flyer</h3>
          <p className="text-sm text-gray-600">
            Great for store windows, shelters, and community boards.
          </p>
        </a>

        <a
          href={`/help/${id}/card/full`}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Full‑Page Sign</h3>
          <p className="text-sm text-gray-600">
            High‑visibility 8.5×11 sign for roadside or window display.
          </p>
        </a>

        <a
          href={`/help/${id}/card/social`}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Social Media Card</h3>
          <p className="text-sm text-gray-600">
            Square 1080×1080 format for Facebook, Instagram, and Nextdoor.
          </p>
        </a>

      </div>
    </div>
  );
}