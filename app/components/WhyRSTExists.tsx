"use client";

import { FaCompass, FaUsers, FaLightbulb } from "react-icons/fa";

export default function WhyRSTExists() {
  return (
    <section className="max-w-4xl mx-auto mt-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-8">Why RST Exists</h2>

      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12">
        RST was created for people who fall through the cracks — the ones who 
        don’t have a safety net, who’ve been overlooked, or who are trying to 
        rebuild their lives with limited support. It exists because asking for 
        help shouldn’t require shame, paperwork, or a long explanation. It 
        should be simple, fast, and human.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaCompass className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">A Different Direction</h3>
          <p className="text-gray-600">
            RST isn’t built like traditional donation platforms. It’s designed 
            for real emergencies, real people, and real communities — not 
            corporate fundraising or influencer culture.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaUsers className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">People First</h3>
          <p className="text-gray-600">
            Every feature is built around dignity and clarity. RST is for the 
            person in a tent during a rainstorm with 3% battery left — the one 
            who needs help now, not after filling out ten forms.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaLightbulb className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Big Ideas, Real Impact</h3>
          <p className="text-gray-600">
            RST is the first step in a larger vision. Future systems like RST2, 
            Stories (MYRNA), Enterprise tools, and even the airborne 
            magnetometer project all share one purpose: building technology 
            that helps people in ways the world hasn’t seen yet.
          </p>
        </div>

      </div>
    </section>
  );
}