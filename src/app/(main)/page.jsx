"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

// Animation hook
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, inView];
}



const stats = [
    { value: "1,200+", label: "Families Served" },
    { value: "300+", label: "Verified Caretakers" },
    { value: "8", label: "Divisions Covered" },
    { value: "98%", label: "Satisfaction Rate" },
];

const steps = [
    { step: "01", title: "Choose a Service", desc: "Browse Baby Care, Elderly Care, or Sick Care services." },
    { step: "02", title: "Book Your Slot", desc: "Select duration, location, and confirm your booking instantly." },
    { step: "03", title: "Get Matched", desc: "We assign a verified caretaker near you right away." },
    { step: "04", title: "Relax & Trust", desc: "Track your booking and relax knowing your family is safe." },
];

export default function HomePage() {
    const [reviews, setReviews] = useState([]);

    const [heroRef, heroIn] = useInView(0.1);
    const [statsRef, statsIn] = useInView();
    const [servicesRef, servicesIn] = useInView();
    const [stepsRef, stepsIn] = useInView();
    const [reviewsRef, reviewsIn] = useInView();
    const [ctaRef, ctaIn] = useInView();
    const [services, setServices] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        fetch("/api/services")
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch services:", err));
    }, []);

    useEffect(() => {
        fetch("/api/reviews")
            .then(res => res.json())
            .then(data => setReviews(data.slice(0, 3)))
            .catch(err => console.error("Failed to fetch reviews:", err));
    }, []);

    return (
        <div className="overflow-x-hidden">

            {/* ── HERO ── */}
            <section className="relative min-h-[92vh] flex items-center bg-background overflow-hidden">
                <div className="absolute -top-20 -right-20 w-105 h-105 rounded-full bg-primary opacity-10 blur-3xl" />
                <div className="absolute -bottom-15 -left-15 w-[320px] h-80 rounded-full bg-accent opacity-20 blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
                    <div
                        ref={heroRef}
                        style={{
                            opacity: heroIn ? 1 : 0,
                            transform: heroIn ? "translateY(0)" : "translateY(40px)",
                            transition: "opacity 0.8s ease, transform 0.8s ease",
                        }}
                    >
                        <span className="inline-block bg-accent/20 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                            Trusted Care Platform
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Care for Every <br />
                            <span className="text-primary">Family Member</span> 💚
                        </h1>
                        <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
                            Book verified caretakers for your children, elderly parents, or sick family members — easily, safely, and affordably across Bangladesh.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                href="/#services"
                                className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200"
                            >
                                Explore Services
                            </Link>
                            {!session && (
                                <Link
                                    href="/register"
                                    className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition"
                                >
                                    Get Started Free
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex -space-x-2">
                                {["women/44", "men/32", "women/68", "men/12"].map((p, i) => (
                                    <Image
                                        key={i}
                                        src={`https://randomuser.me/api/portraits/${p}.jpg`}
                                        alt="user"
                                        width={36}
                                        height={36}
                                        className="rounded-full border-2 border-white"
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-muted">
                                <span className="font-bold text-gray-800">1,200+</span> families trust us
                            </p>
                        </div>
                    </div>

                    <div
                        style={{
                            opacity: heroIn ? 1 : 0,
                            transform: heroIn ? "translateX(0)" : "translateX(60px)",
                            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
                        }}
                        className="relative"
                    >
                        <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80"
                                alt="Caring for family"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 bg-white dark:bg-[#1A2E1E] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
                            <span className="text-3xl">⭐</span>
                            <div>
                                <p className="font-bold text-gray-800 text-sm">4.9 / 5 Rating</p>
                                <p className="text-xs text-muted">From 800+ reviews</p>
                            </div>
                        </div>
                        <div className="absolute -top-5 -right-5 bg-primary text-white rounded-2xl shadow-xl px-4 py-3">
                            <p className="font-bold text-sm">300+ Caretakers</p>
                            <p className="text-xs opacity-80">Ready to help</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="bg-primary py-12">
                <div
                    ref={statsRef}
                    className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: statsIn ? 1 : 0,
                                transform: statsIn ? "translateY(0)" : "translateY(30px)",
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

            {/* ── SERVICES ── */}
            <section id="services" className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Offer</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Our Care Services</h2>
                        <p className="text-muted mt-3 max-w-xl mx-auto">Professional, verified, and compassionate care for every member of your family.</p>
                    </div>

                    <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                        opacity: servicesIn ? 1 : 0,
                                        transform: servicesIn ? "translateY(0)" : "translateY(40px)",
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        <span className="absolute top-4 left-4 text-3xl">{s.icon}</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                                        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{s.description}</p>
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

                    {/* See All Button */}
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

            {/* ── HOW IT WORKS ── */}
            <section className="py-20 bg-white dark:bg-[#1A2E1E]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Simple Process</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">How It Works</h2>
                    </div>
                    <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    opacity: stepsIn ? 1 : 0,
                                    transform: stepsIn ? "translateY(0)" : "translateY(40px)",
                                    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                                }}
                                className="text-center"
                            >
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

            {/* ── ABOUT ── */}
            <section id="about" className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                                alt="About Care.xyz"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-accent rounded-2xl px-6 py-4 shadow-lg">
                            <p className="font-extrabold text-2xl text-gray-900">5+ Years</p>
                            <p className="text-sm text-gray-700">of trusted service</p>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Who We Are</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
                            Bangladesh's Most Trusted Care Platform
                        </h2>
                        <p className="text-muted leading-relaxed mb-4">
                            Care.xyz was founded with one mission — to make quality caregiving accessible to every family in Bangladesh. Whether you need a babysitter for your child, a companion for your elderly parent, or an attendant for a sick family member, we've got you covered.
                        </p>
                        <p className="text-muted leading-relaxed mb-6">
                            All our caretakers are background-checked, trained, and reviewed by real families. We operate across all 8 divisions of Bangladesh.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            {["Background Checked ✅", "Trained & Certified ✅", "24/7 Support ✅"].map((badge, i) => (
                                <span key={i} className="bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-20 bg-white dark:bg-[#1A2E1E]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Real Stories</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">What Families Say</h2>
                    </div>
                    <div ref={reviewsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.length === 0 ? (
                            // skeleton loading
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
                                        opacity: reviewsIn ? 1 : 0,
                                        transform: reviewsIn ? "translateY(0)" : "translateY(40px)",
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

            {/* ── CTA ── */}
            <section className="py-20 bg-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div
                    ref={ctaRef}
                    style={{
                        opacity: ctaIn ? 1 : 0,
                        transform: ctaIn ? "translateY(0)" : "translateY(30px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                    }}
                    className="max-w-3xl mx-auto px-4 text-center text-white"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Ready to Book a Caretaker?
                    </h2>
                    <p className="text-lg opacity-80 mb-8">
                        Join 1,200+ families who trust Care.xyz for their loved ones.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-4 bg-accent text-gray-900 font-bold rounded-2xl hover:bg-yellow-400 transition shadow-xl text-lg"
                    >
                        Get Started Today →
                    </Link>
                </div>
            </section>

        </div>
    );
}