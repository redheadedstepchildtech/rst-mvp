export default function ReportBugPage() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Report a Bug</h1>

      <p className="text-gray-600">
        Found something that’s not working right? Tell us what happened and we’ll take a look.
      </p>

      <form
        action="mailto:techteam@RedheadedStepchildTech.com"
        method="POST"
        encType="text/plain"
        className="space-y-4"
      >
        <textarea
          name="bug"
          placeholder="Describe the issue..."
          className="w-full border rounded p-3 h-40"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Send Report
        </button>
      </form>
    </div>
  );
}