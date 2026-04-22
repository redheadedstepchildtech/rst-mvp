"use client";
import { useState } from "react";

export default function NavMobile() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-100 border-b p-4 md:hidden">
      <div className="text-xl font-bold text-gray-700 mb-2">
        Myrna
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 bg-white border rounded-lg font-semibold text-left"
      >
        {open ? "Close Menu" : "Menu"}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <a
            href="/rst2"
            className="block p-3 bg-white border rounded-lg font-semibold hover:bg-gray-200"
          >
            Home
          </a>

          <a
            href="/rst2/forms"
            className="block p-3 bg-white border rounded-lg font-semibold hover:bg-gray-200"
          >
            Form Filler Outer
          </a>

          <a
            href="/rst2/forms/all"
            className="block p-3 bg-white border rounded-lg font-semibold hover:bg-gray-200"
          >
            All Forms
          </a>

          <a
            href="/rst2/stories"
            className="block p-3 bg-white border rounded-lg font-semibold hover:bg-gray-200"
          >
            Stories
          </a>

          <a
            href="/rst2/admin"
            className="block p-3 bg-white border rounded-lg font-semibold hover:bg-gray-200"
          >
            Admin Dashboard
          </a>
        </div>
      )}
    </nav>
  );
}