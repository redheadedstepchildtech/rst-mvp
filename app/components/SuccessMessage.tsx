export default function SuccessMessage({ message }: { message: string }) {
  if (!message) return null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
        {message}
      </div>
    </main>
  );
}