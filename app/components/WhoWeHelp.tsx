"use client";

import { FaHome, FaUserAlt, FaHandsHelping } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

export default function WhoWeHelp() {
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
      <h2 className="text-4xl font-bold mb-8">Who We Help</h2>

      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaUserAlt className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Individuals in Crisis</h3>
          <p className="text-gray-600">
            People facing sudden hardship — job loss, medical issues, or 
            unexpected emergencies — who need support quickly and quietly.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaHome className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Families Struggling</h3>
          <p className="text-gray-600">
            Parents and caregivers doing their best with limited resources, 
            trying to keep their households stable and safe.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition">
          <FaHandsHelping className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">People Helping Others</h3>
          <p className="text-gray-600">
            Neighbors, volunteers, and donors who want a simple way to give 
            back and make a real difference in someone’s life.
          </p>
        </div>

      </div>
    </section>
  );
}