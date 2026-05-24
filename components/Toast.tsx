"use client";

export default function Toast({ message, onClose }) {
  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
      {message}
      <button className="ml-4 underline" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

