export default function DonationPage({ params }) {
  // Later: fetch donation data using params.id
  const data = {
    name: "Dave Reynolds",
    category: "Legal Help",
    story: "My daughters called the cops on me and I need help with a lawyer.",
    payoutMethod: "Cash App",
    photoUrl: "/placeholder.jpg", // replace with real uploaded photo
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-6 space-y-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-red-700 text-center">
          {data.name} Needs Your Help
        </h1>

        {/* PHOTO */}
        {data.photoUrl && (
          <img
            src={data.photoUrl}
            alt="Donation"
            className="w-full h-64 object-cover rounded-lg border"
          />
        )}

        {/* CATEGORY */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Category</h2>
          <p className="text-gray-700">{data.category}</p>
        </div>

        {/* STORY */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Story</h2>
          <p className="text-gray-700 whitespace-pre-line">{data.story}</p>
        </div>

        {/* DONATE BUTTON */}
        <button className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold">
          Donate Now
        </button>

        {/* QR CODE (placeholder for now) */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">Scan to donate</p>
          <div className="w-32 h-32 bg-gray-300 mx-auto rounded-lg"></div>
        </div>

        {/* SHARE BUTTON */}
        <button
          className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          Copy Link to Share
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500">
          Powered by Redheaded Stepchild Tech
        </p>
      </div>
    </div>
  );
}