"use client";

import { FaBolt, FaShieldAlt, FaHeart } from "react-icons/fa";

export default function WhatMakesRSTDifferent() {
  return (
    <section className="max-w-4xl mx-auto mt-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-8">What Makes RST Different</h2>

      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12">
        RST isn’t a traditional donation platform. It’s built for real people in 
        real situations — the person in a tent during a rainstorm with 3% battery, 
        the parent trying to keep the lights on, the neighbor who wants to help 
        without judgment or red tape. RST is simple, fast, and human.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaBolt className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Built for Speed</h3>
          <p className="text-gray-600">
            No long forms, no complicated setup, no waiting days to publish. 
            RST is designed for people who need help *right now*.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaShieldAlt className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Dignity First</h3>
          <p className="text-gray-600">
            No public shaming, no pressure to overshare, no emotional 
            exploitation. RST protects the dignity of every person who asks for help.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaHeart className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Human‑Centered</h3>
          <p className="text-gray-600">
            RST focuses on real needs — food, clothing, supplies, emergencies — 
            not influencer culture or subscription models. It’s community, not commerce.
          </p>
        </div>

      </div>
    </section>
  );
}