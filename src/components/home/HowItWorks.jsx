"use client";
import useInView from "@/hooks/useInView";

const steps = [
    { step: "01", title: "Choose a Service", desc: "Browse Baby Care, Elderly Care, or Sick Care services." },
    { step: "02", title: "Book Your Slot", desc: "Select duration, location, and confirm your booking instantly." },
    { step: "03", title: "Get Matched", desc: "We assign a verified caretaker near you right away." },
    { step: "04", title: "Relax & Trust", desc: "Track your booking and relax knowing your family is safe." },
];

export default function HowItWorks() {
    const [ref, inView] = useInView();

    return (
        <section className="py-20 bg-white dark:bg-[#1A2E1E]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Simple Process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                        How It Works
                    </h2>
                </div>
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(40px)",
                                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                            }}
                            className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-extrabold text-primary">{s.step}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}