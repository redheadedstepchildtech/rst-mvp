export default function DonationCanceled() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Donation Canceled</h1>
      <p className="text-gray-700 mb-6">
        Your donation was not completed. You can try again anytime.
      </p>

      <a
        href="/"
        className="inline-block bg-gray-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
      >
        Return Home
      </a>
    </div>
  );
}
