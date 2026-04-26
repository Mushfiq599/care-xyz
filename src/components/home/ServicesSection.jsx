"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useInView from "@/hooks/useInView";

export default function ServicesSection() {
    const [services, setServices] = useState([]);
    const [ref, inView] = useInView();

    useEffect(() => {
        fetch("/api/services")
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch services:", err));
    }, []);

    return (
        <section id="services" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        What We Offer
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                        Our Care Services
                    </h2>
                    <p className="text-muted mt-3 max-w-xl mx-auto">
                        Professional, verified, and compassionate care for every member of your family.
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.length === 0 ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-white dark:bg-[#1A2E1E] rounded-3xl overflow-hidden shadow-md animate-pulse">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : (
                        services.slice(0, 3).map((s, i) => (
                            <div
                                key={s.id}
                                style={{
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? "translateY(0)" : "translateY(40px)",
                                    transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
                                }}
                                className="bg-white dark:bg-[#1A2E1E] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={s.image}
                                        alt={s.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                                    <span className="absolute top-4 left-4 text-3xl">{s.icon}</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                                    <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                                        {s.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-bold">৳{s.charge}/hr</span>
                                        <Link
                                            href={`/service/${s.id}`}
                                            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition text-lg"
                    >
                        See All Services →
                    </Link>
                </div>
            </div>
        </section>
    );
}