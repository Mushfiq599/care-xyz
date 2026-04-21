"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/services")
            .then(res => res.json())
            .then(data => { setServices(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <FiLoader className="animate-spin text-primary text-4xl mx-auto mb-4" />
                    <p className="text-muted">Loading services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        What We Offer
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
                        All Care Services
                    </h1>
                    <p className="text-muted mt-3 max-w-xl mx-auto text-lg">
                        Professional, verified, and compassionate care for every member of your family.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div
                            key={s.id}
                            style={{
                                animationDelay: `${i * 0.1}s`,
                            }}
                            className="bg-white dark:bg-[#1A2E1E] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                <span className="absolute top-4 left-4 text-3xl">{s.icon}</span>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                        ৳{s.charge}/hr
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{s.title}</h3>
                                <p className="text-primary text-sm font-medium mb-3">{s.tagline}</p>
                                <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-2">
                                    {s.description}
                                </p>
                                <Link
                                    href={`/service/${s.id}`}
                                    className="block w-full text-center px-4 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Back to home */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}