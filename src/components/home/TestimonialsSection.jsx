"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import useInView from "@/hooks/useInView";

export default function TestimonialsSection() {
    const [reviews, setReviews] = useState([]);
    const [ref, inView] = useInView();

    useEffect(() => {
        fetch("/api/reviews")
            .then(res => res.json())
            .then(data => setReviews(data.slice(0, 3)))
            .catch(err => console.error("Failed to fetch reviews:", err));
    }, []);

    return (
        <section className="py-20 bg-white dark:bg-[#1A2E1E]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Real Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                        What Families Say
                    </h2>
                </div>
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.length === 0 ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-background dark:bg-[#0F1A12] rounded-3xl p-6 animate-pulse">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-24" />
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
                                <div className="flex items-center gap-3 mt-4">
                                    <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700" />
                                    <div>
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1" />
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        reviews.map((r, i) => (
                            <div
                                key={r.id}
                                style={{
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? "translateY(0)" : "translateY(40px)",
                                    transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
                                }}
                                className="bg-background dark:bg-[#0F1A12] rounded-3xl p-6 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex gap-1 mb-3">
                                    {Array(r.ratings).fill(0).map((_, j) => (
                                        <span key={j} className="text-accent text-lg">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                    "{r.review}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={r.user_photoURL}
                                        alt={r.userName}
                                        width={44}
                                        height={44}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{r.userName}</p>
                                        <p className="text-xs text-muted">{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}