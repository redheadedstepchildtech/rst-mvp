export default function DonationSuccess() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-gray-700 mb-6">
        Your donation was successfully processed. Your support truly makes a difference.
      </p>

      <a
        href="/"
        className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Return Home
      </a>
    </div>
  );
}

