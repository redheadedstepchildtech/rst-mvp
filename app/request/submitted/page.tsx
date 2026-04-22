export default function RequestSubmittedPage() {
  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-3xl font-bold">Request Submitted</h1>
      <p className="text-gray-700">
        Your request has been received and is awaiting review.
      </p>
      <p className="text-gray-600">
        If it is approved, it will appear on the public request list.
      </p>
    </div>
  );
}