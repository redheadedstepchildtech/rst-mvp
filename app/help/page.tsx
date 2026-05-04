export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Help & FAQ</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What is RST?</h2>
        <p className="text-gray-700">
          Redheaded Stepchild Tech (RST) is a community-driven platform designed to help people donate items, request help, and connect with local resources.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How do I donate items?</h2>
        <p className="text-gray-700">
          Navigate to the donation page, fill out the item details, and submit. A volunteer or recipient will contact you if they are interested.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How do I report a bug?</h2>
        <p className="text-gray-700">
          Use the “Report a Bug” link in the footer. You can describe the issue and send it directly to the RST tech team.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What’s coming next?</h2>
        <p className="text-gray-700">
          Upcoming features include AI-assisted donation flow, improved search, and the RST Swap-Meet system.
        </p>
      </section>
    </div>
  );
}