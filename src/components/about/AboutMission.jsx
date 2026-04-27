"use client";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import useInView from "@/hooks/useInView";

export default function AboutMission() {
    const [ref, inView] = useInView();

    return (
        <section className="py-20">
            <div
                ref={ref}
                className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateX(0)" : "translateX(-50px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                    }}
                    className="relative">
                    <div className="relative w-full h-105 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80"
                            alt="Our Mission"
                            fill
                            className="object-cover"/>
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-accent rounded-2xl px-6 py-4 shadow-xl">
                        <p className="font-extrabold text-2xl text-gray-900">5+ Years</p>
                        <p className="text-sm text-gray-700">of trusted service</p>
                    </div>
                    <div className="absolute -top-6 -left-6 bg-primary text-white rounded-2xl px-5 py-4 shadow-xl">
                        <p className="font-extrabold text-xl">98% Happy</p>
                        <p className="text-xs opacity-80">Families nationwide</p>
                    </div>
                </div>

                <div
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateX(0)" : "translateX(50px)",
                        transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                    }}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Our Mission
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-5">
                        Making Caregiving Easy, Safe & Accessible
                    </h2>
                    <p className="text-muted leading-relaxed mb-4">
                        Care.xyz was founded by a team of healthcare professionals who saw a critical
                        gap — families across Bangladesh struggling to find reliable, affordable care
                        for their children, elderly parents, and sick family members.
                    </p>
                    <p className="text-muted leading-relaxed mb-6">
                        We built a platform that connects families with verified, trained caretakers
                        across all 8 divisions of Bangladesh. Our goal is simple: give every family
                        peace of mind knowing their loved ones are in safe hands.
                    </p>
                    <div className="space-y-3">
                        {[
                            "All caretakers background-checked & verified",
                            "Serving all 8 divisions of Bangladesh",
                            "24/7 support for families",
                            "Transparent pricing, no hidden fees",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <FiCheckCircle className="text-primary shrink-0 text-lg" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}