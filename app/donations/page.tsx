"use client";

export default function DonationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">

      <section className="max-w-xl mx-auto text-center">

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Monetary Donations
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          Choose an option below to create your donation request or browse
          existing requests from people who need help right now.
        </p>

        <div className="flex flex-col gap-4">

          {/* Create Donation Request */}
          <a
            href="/create-donation"
            className="w-full px-6 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700"
          >
            Create Donation Request
          </a>

          {/* Browse Requests */}
          <a
            href="/donations/browse"
            className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg font-semibold text-lg hover:bg-gray-900"
          >
            Browse Requests
          </a>

        </div>

      </section>

    </main>
  );
}
