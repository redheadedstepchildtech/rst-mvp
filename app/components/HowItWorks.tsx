"use client";

import { useEffect, useState } from "react";
import { FaHandsHelping, FaRegCommentDots, FaGift } from "react-icons/fa";

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-b from-red-50 to-white py-20 relative overflow-hidden">

      {/* Watermark */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10">
        <span className="text-red-300 text-[220px]">❤️</span>
      </div>

      {/* Animated Section */}
      <section
        className={`
          relative max-w-4xl mx-auto px-6 text-center 
          transition-all duration-700 
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h2 className="text-4xl font-bold mb-8">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Step 1 */}
          <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
            <FaHandsHelping className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">1. Create a Request</h3>
            <p className="text-gray-600">
              Tell the community what you need — food, clothing, supplies, or a
              specific item. No long forms, no hoops to jump through.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
            <FaRegCommentDots className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">2. Share Your Story</h3>
            <p className="text-gray-600">
              Add a short description so people understand your situation. Your
              story helps others connect and respond with compassion.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
            <FaGift className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">3. Receive Support</h3>
            <p className="text-gray-600">
              Community members can donate items, offer help, or share your
              request. Small acts of kindness can change everything.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}