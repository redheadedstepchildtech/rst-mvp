export default function SuccessMessage({ message }) {
  if (!message) return null;

<main className="max-w-3xl mx-auto px-6 py-8">
  <SuccessMessage message={success} />

  return (
    <div className="p-4 mb-6 bg-green-100 border border-green-300 text-green-800 rounded-md">
      {message}
    </div>
  );
}