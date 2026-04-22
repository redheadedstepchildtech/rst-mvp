export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="p-4 mb-6 bg-red-100 border border-red-300 text-red-800 rounded-md">
      {message}
    </div>
  );
}