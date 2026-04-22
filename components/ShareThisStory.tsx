export default function ShareThisStory({ id }: { id: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const minisiteUrl = `${baseUrl}/help/${id}`;
  const socialCardUrl = `${baseUrl}/help/${id}/card/social`;
  const signupUrl = `${baseUrl}/get-started`;

  const encodedMinisite = encodeURIComponent(minisiteUrl);
  const encodedSocial = encodeURIComponent(socialCardUrl);
  const encodedSignup = encodeURIComponent(signupUrl);

  return (
    <div className="border rounded-xl p-6 shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Share This Story</h2>

      <p className="text-gray-600">
        Share this help request or invite others to join the platform.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedMinisite}`}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Facebook</h3>
          <p className="text-sm text-gray-600">Share to your feed or groups.</p>
        </a>

        {/* Nextdoor */}
        <a
          href={`https://nextdoor.com/share?url=${encodedMinisite}`}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Nextdoor</h3>
          <p className="text-sm text-gray-600">Share with your neighborhood.</p>
        </a>

        {/* Reddit */}
        <a
          href={`https://www.reddit.com/submit?url=${encodedMinisite}`}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Reddit</h3>
          <p className="text-sm text-gray-600">Share to community subreddits.</p>
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=Someone Needs Help&body=Please take a moment to read this: ${encodedMinisite}`}
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">Email</h3>
          <p className="text-sm text-gray-600">Send to friends or groups.</p>
        </a>

        {/* SMS */}
        <a
          href={`sms:?&body=Someone needs help. View their story here: ${encodedMinisite}`}
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-gray-900">SMS</h3>
          <p className="text-sm text-gray-600">Send a text message.</p>
        </a>

        {/* Copy Link */}
        <button
          onClick={() => navigator.clipboard.writeText(minisiteUrl)}
          className="block border rounded-lg p-4 hover:bg-gray-50 transition text-left"
        >
          <h3 className="font-semibold text-gray-900">Copy Link</h3>
          <p className="text-sm text-gray-600">Copy minisite link to share anywhere.</p>
        </button>

        {/* Invite Others to Join */}
        <a
          href={signupUrl}
          target="_blank"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition col-span-1 sm:col-span-2"
        >
          <h3 className="font-semibold text-gray-900">Invite Others to Join</h3>
          <p className="text-sm text-gray-600">
            Help someone else create their own help request.
          </p>
        </a>

      </div>
    </div>
  );
}