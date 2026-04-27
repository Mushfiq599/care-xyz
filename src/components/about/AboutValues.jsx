"use client";
import { FiHeart, FiShield, FiUsers, FiAward } from "react-icons/fi";
import useInView from "@/hooks/useInView";

const values = [
    {
        icon: <FiHeart className="text-2xl" />,
        title: "Compassion First",
        desc: "We treat every family member with the same love and care we would give our own.",
        color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    },
    {
        icon: <FiShield className="text-2xl" />,
        title: "Safety & Trust",
        desc: "All caretakers are background-verified, trained, and reviewed by real families.",
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
        icon: <FiUsers className="text-2xl" />,
        title: "Family Focused",
        desc: "We understand families are unique. Our services are tailored to your specific needs.",
        color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
        icon: <FiAward className="text-2xl" />,
        title: "Quality Service",
        desc: "We maintain the highest standards with continuous training and quality checks.",
        color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
];

export default function AboutValues() {
    const [ref, inView] = useInView();

    return (
        <section className="py-20 bg-white dark:bg-[#1A2E1E]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        What Drives Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                        Our Core Values
                    </h2>
                </div>
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(40px)",
                                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                            }}
                            className="bg-background dark:bg-[#0F1A12] rounded-3xl p-6 hover:shadow-lg transition group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${v.color} group-hover:scale-110 transition-transform`}>
                                {v.icon}
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}