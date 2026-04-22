<div className="bg-white border-2 border-gray-900 rounded-xl shadow-xl p-6 space-y-4">

  <div className="space-y-1">
    <p className="text-sm uppercase font-semibold text-gray-500">Donor</p>
    <p className="text-2xl font-bold text-gray-900">{donation.donorName}</p>
  </div>

  <div className="space-y-1">
    <p className="text-sm uppercase font-semibold text-gray-500">Amount</p>
    <p className="text-3xl font-extrabold text-green-600">${donation.amount}</p>
  </div>

  {/* Photo */}
  {donation.photoUrl && (
    <div className="space-y-1">
      <p className="text-sm uppercase font-semibold text-gray-500">Photo</p>
      <img
        src={donation.photoUrl}
        alt="Donation"
        className="w-full max-h-64 object-cover rounded-lg border"
      />
    </div>
  )}

  <div className="space-y-1">
    <p className="text-sm uppercase font-semibold text-gray-500">Message</p>
    <p className="text-lg text-gray-800">
      {donation.message || "No message provided"}
    </p>
  </div>

  <p className="text-sm text-gray-500 pt-2">
    Created: {new Date(donation.createdAt).toLocaleString()}
  </p>
</div>