import { prisma } from "@/lib/prisma";
import { reportPhoto } from "@/app/actions/reportActions";
import Link from "next/link";

export default async function ReportPhotoPage({ searchParams }) {
  const needId = searchParams?.needId;

  if (!needId) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Missing Need ID</h1>
        <p className="text-gray-600 mt-2">
          No need was specified for reporting.
        </p>
      </div>
    );
  }

  const need = await prisma.need.findUnique({
    where: { id: needId },
  });

  if (!need) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Need not found</h1>
        <p className="text-gray-600 mt-2">
          This listing may have been removed or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">

      <Link
        href={`/rst/needs/${needId}`}
        className="inline-block mb-4 text-blue-600 underline text-sm"
      >
        ← Back to Need
      </Link>

      <h1 className="text-3xl font-bold mb-4">Report a Photo</h1>

      <p className="text-gray-700 mb-6">
        Help us keep the platform safe and respectful. Please tell us why you’re reporting this photo.
      </p>

      <form action={reportPhoto} className="space-y-4">

        <input type="hidden" name="needId" value={needId} />

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">Reason</label>
          <select
            name="reason"
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a reason</option>
            <option value="Inappropriate">Inappropriate</option>
            <option value="Violence">Violence</option>
            <option value="Hate Speech">Hate Speech</option>
            <option value="Spam">Spam</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional Notes (optional)</label>
          <textarea
            name="notes"
            rows={4}
            className="w-full border rounded px-3 py-2"
            placeholder="Describe the issue..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
        >
          Submit Report
        </button>
      </form>
    </main>
  );
}