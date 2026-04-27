"use client";
import useInView from "@/hooks/useInView";

const milestones = [
    { year: "2019", title: "Founded", desc: "Care.xyz was born with a mission to make caregiving accessible across Bangladesh." },
    { year: "2020", title: "First 100 Families", desc: "Reached our first milestone of serving 100 families in Dhaka." },
    { year: "2021", title: "Nationwide Expansion", desc: "Expanded services to all 8 divisions of Bangladesh." },
    { year: "2022", title: "500+ Caretakers", desc: "Built a network of over 500 verified and trained caretakers." },
    { year: "2023", title: "1000+ Families", desc: "Crossed 1,000 families served with a 98% satisfaction rate." },
    { year: "2024", title: "New Services", desc: "Launched specialized services including dementia care and home nursing." },
];

export default function AboutTimeline() {
    const [ref, inView] = useInView();

    return (
        <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        How We Grew
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                        Our Journey
                    </h2>
                </div>

                <div ref={ref} className="relative">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 dark:bg-primary/30 -translate-x-1/2" />

                    {milestones.map((m, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(30px)",
                                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                            }}
                            className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}>
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10" />
                            <div className={`ml-14 md:ml-0 md:w-[45%] bg-white dark:bg-[#1A2E1E] rounded-2xl p-5 shadow-sm hover:shadow-md transition ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                                }`}>
                                <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">
                                    {m.year}
                                </span>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{m.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}