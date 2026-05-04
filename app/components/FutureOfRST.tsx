"use client";

import { FaArrowRight, FaRocket, FaBook, FaBuilding, FaPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

export default function FutureOfRST() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={`
        max-w-4xl mx-auto mt-20 px-6 text-center transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <h2 className="text-4xl font-bold mb-8">The Future of RST</h2>

      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12">
        RST is just the beginning. Redheaded Stepchild Tech is building a suite 
        of tools designed to help people, communities, and organizations in ways 
        traditional software never has. Here’s a glimpse of what’s coming next.
      </p>

      <div className="grid md:grid-cols-4 gap-8">

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaRocket className="text-red-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">RST 2.0</h3>
          <p className="text-gray-600 text-sm">
            A smarter, faster version of RST with automation and guided support.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaBook className="text-red-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">Stories / MYRNA</h3>
          <p className="text-gray-600 text-sm">
            A storytelling system that preserves lived experiences with dignity.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaBuilding className="text-red-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">Enterprise Tools</h3>
          <p className="text-gray-600 text-sm">
            Software for shelters, nonprofits, and community organizations.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaPlane className="text-red-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">Airborne Magnetometer</h3>
          <p className="text-gray-600 text-sm">
            Advanced survey tech for environmental and geological mapping.
          </p>
        </div>

      </div>

      <div className="mt-10 text-gray-500 text-sm flex items-center justify-center gap-2">
        <span>One mission.</span>
        <FaArrowRight className="text-red-400" />
        <span>Many tools.</span>
      </div>
    </section>
  );
}