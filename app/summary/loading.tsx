export default function Loading() {
  return (
    <div className="max-w-xl mx-auto p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
}