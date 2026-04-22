"use client";

import { useState } from "react";

export function Fab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {!open && (
        <div className="absolute -top-10 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-80">
          Create New
        </div>
      )}

      {/* Expandable Menu */}
      {open && (
        <div className="flex flex-col gap-3 mb-3">
          <a
            href="/rst/create"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition text-sm"
          >
            Create Need
          </a>
          <a
            href="/rst/create?type=offer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm"
          >
            Create Offer
          </a>
          <a
            href="/rst/create?type=donation"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition text-sm"
          >
            Create Donation
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          bg-green-600
          text-white
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          text-3xl
          shadow-lg
          hover:bg-green-700
          transition
          md:w-16 md:h-16
        "
      >
        {open ? "×" : "+"}
      </button>
    </div>
  );
}