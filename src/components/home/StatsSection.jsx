"use client";
import useInView from "@/hooks/useInView";

const stats = [
    { value: "1,200+", label: "Families Served" },
    { value: "300+", label: "Verified Caretakers" },
    { value: "8", label: "Divisions Covered" },
    { value: "98%", label: "Satisfaction Rate" },
];

export default function StatsSection() {
    const [ref, inView] = useInView();

    return (
        <section className="bg-primary py-12">
            <div
                ref={ref}
                className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
                {stats.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateY(0)" : "translateY(30px)",
                            transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                        }}
                        className="text-center text-white"
                    >
                        <p className="text-3xl md:text-4xl font-extrabold">{s.value}</p>
                        <p className="text-sm opacity-80 mt-1">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}