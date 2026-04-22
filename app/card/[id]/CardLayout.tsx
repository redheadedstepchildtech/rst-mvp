"use client";

import React from "react";

export default function CardLayout({
  data,
  size,
  children,
}: {
  data: any;
  size: "business" | "half" | "full" | "social";
  children?: React.ReactNode;
}) {
  const { name, photo, qrCode, topNeeds, payment } = data;

  // Format-specific sizing
  const sizeClasses = {
    business: "w-[350px] h-[550px] p-4",
    half: "w-[600px] h-[850px] p-6",
    full: "w-[850px] h-[1100px] p-8",
    social: "w-[1080px] h-[1080px] p-10",
  };

  return (
    <div className="flex flex-col items-center bg-white text-black mx-auto">
      {/* PRINT BUTTON */}
      <div className="w-full flex justify-end mb-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800"
        >
          Print
        </button>
      </div>

      {/* CARD CONTENT */}
      <div
        className={`border shadow-lg rounded-lg flex flex-col items-center ${sizeClasses[size]}`}
      >
        {/* PHOTO (if available) */}
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-auto rounded mb-4 object-cover"
          />
        ) : (
          <p className="text-xs text-gray-500 italic mb-4">
            No photo provided. Donation cards without photographs may receive fewer donations.
          </p>
        )}

        {/* NAME */}
        <h1 className="text-2xl font-bold text-center mb-3">{name}</h1>

        {/* QR CODE */}
        <img
          src={qrCode}
          alt="QR Code"
          className="w-40 h-40 mb-4"
        />

        {/* TOP 3 NEEDS — bold, no label */}
        {topNeeds.length > 0 && (
          <p className="text-xl font-bold text-center mb-4">
            {topNeeds.join(" • ")}
          </p>
        )}

        {/* OPTIONAL PAYMENT HANDLES */}
        {payment && (
          <p className="text-sm text-center text-gray-700 whitespace-pre-line mb-4">
            {payment}
          </p>
        )}

        {/* FORMAT-SPECIFIC CONTENT */}
        {children}

        {/* BRANDING FOOTER — right aligned */}
        <div className="w-full mt-auto pt-4">
          <p className="text-xs text-gray-500 text-right">
            Powered by Redheaded Stepchild Tech
          </p>
        </div>
      </div>
    </div>
  );
}