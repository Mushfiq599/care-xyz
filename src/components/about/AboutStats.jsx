"use client";
import useInView from "@/hooks/useInView";
import { FaUsers, FaUserNurse, FaMapMarkedAlt, FaStar } from "react-icons/fa";

const stats = [
  { value: "1,200+", label: "Families Served", icon: <FaUsers /> },
  { value: "300+", label: "Verified Caretakers", icon: <FaUserNurse /> },
  { value: "8", label: "Divisions Covered", icon: <FaMapMarkedAlt /> },
  { value: "98%", label: "Satisfaction Rate", icon: <FaStar /> },
];

export default function AboutStats() {
  const [ref, inView] = useInView();

  return (
    <section className="bg-primary py-14">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}
            className="text-center text-white">
            <div className="flex justify-center text-4xl mb-1">
              {s.icon}
            </div>
            <p className="text-3xl md:text-4xl font-extrabold">
              {s.value}
            </p>
            <p className="text-sm opacity-80 mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}