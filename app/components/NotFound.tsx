export default function NotFound({ message }) {
  return (
    <div className="p-6 text-center text-gray-700">
      <h2 className="text-xl font-semibold mb-2">Not Found</h2>
      <p>{message}</p>
    </div>
  );
}