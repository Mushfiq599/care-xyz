"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    FiHeart, FiShield, FiUsers, FiAward,
    FiCheckCircle, FiMapPin, FiPhone, FiMail
} from "react-icons/fi";

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

const team = [
    {
        name: "Dr. Farhan Ahmed",
        role: "Founder & CEO",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "Former pediatrician with 15 years of experience, passionate about accessible healthcare.",
    },
    {
        name: "Nusrat Islam",
        role: "Head of Operations",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        bio: "Expert in healthcare operations with a mission to connect families with trusted caregivers.",
    },
    {
        name: "Karim Hossain",
        role: "Chief Care Officer",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        bio: "Specialized in elderly and special needs care with over a decade of field experience.",
    },
    {
        name: "Sumaiya Akter",
        role: "Head of Training",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        bio: "Certified trainer who ensures all caregivers meet our high standards of care.",
    },
];

const milestones = [
    { year: "2019", title: "Founded", desc: "Care.xyz was born with a mission to make caregiving accessible across Bangladesh." },
    { year: "2020", title: "First 100 Families", desc: "Reached our first milestone of serving 100 families in Dhaka." },
    { year: "2021", title: "Nationwide Expansion", desc: "Expanded services to all 8 divisions of Bangladesh." },
    { year: "2022", title: "500+ Caretakers", desc: "Built a network of over 500 verified and trained caretakers." },
    { year: "2023", title: "1000+ Families", desc: "Crossed 1,000 families served with a 98% satisfaction rate." },
    { year: "2024", title: "New Services", desc: "Launched specialized services including dementia care and home nursing." },
];

const stats = [
    { value: "1,200+", label: "Families Served", icon: "👨‍👩‍👧‍👦" },
    { value: "300+", label: "Verified Caretakers", icon: "👩‍⚕️" },
    { value: "8", label: "Divisions Covered", icon: "🗺️" },
    { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
];

export default function AboutPage() {
    const [heroRef, heroIn] = useInView(0.1);
    const [missionRef, missionIn] = useInView();
    const [valuesRef, valuesIn] = useInView();
    const [timelineRef, timelineIn] = useInView();
    const [teamRef, teamIn] = useInView();
    const [statsRef, statsIn] = useInView();
    const [ctaRef, ctaIn] = useInView();

    return (
        <div className="overflow-x-hidden bg-background">

            {/* ── HERO ── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80"
                        alt="About Care.xyz"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                </div>

                <div
                    ref={heroRef}
                    style={{
                        opacity: heroIn ? 1 : 0,
                        transform: heroIn ? "translateY(0)" : "translateY(40px)",
                        transition: "opacity 0.9s ease, transform 0.9s ease",
                    }}
                    className="relative max-w-7xl mx-auto px-4"
                >
                    <span className="inline-block bg-primary/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest border border-green-500/30">
                        Our Story
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-2xl">
                        Caring for Bangladesh's
                        <span className="text-primary"> Families</span> Since 2019
                    </h1>
                    <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
                        We started with a simple belief — every family deserves access to trusted, professional care for their loved ones, regardless of where they live.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            href="/services"
                            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg"
                        >
                            Our Services →
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition"
                        >
                            Join Us Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="bg-primary py-14">
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
                            <p className="text-4xl mb-1">{s.icon}</p>
                            <p className="text-3xl md:text-4xl font-extrabold">{s.value}</p>
                            <p className="text-sm opacity-80 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MISSION ── */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div
                        ref={missionRef}
                        style={{
                            opacity: missionIn ? 1 : 0,
                            transform: missionIn ? "translateX(0)" : "translateX(-50px)",
                            transition: "opacity 0.8s ease, transform 0.8s ease",
                        }}
                        className="relative"
                    >
                        <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80"
                                alt="Our Mission"
                                fill
                                className="object-cover"
                            />
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
                            opacity: missionIn ? 1 : 0,
                            transform: missionIn ? "translateX(0)" : "translateX(50px)",
                            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                        }}
                    >
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Mission</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-5">
                            Making Caregiving Easy, Safe & Accessible
                        </h2>
                        <p className="text-muted leading-relaxed mb-4">
                            Care.xyz was founded by a team of healthcare professionals who saw a critical gap — families across Bangladesh struggling to find reliable, affordable care for their children, elderly parents, and sick family members.
                        </p>
                        <p className="text-muted leading-relaxed mb-6">
                            We built a platform that connects families with verified, trained caretakers across all 8 divisions of Bangladesh. Our goal is simple: give every family peace of mind knowing their loved ones are in safe hands.
                        </p>
                        <div className="space-y-3">
                            {[
                                "All caretakers background-checked & verified",
                                "Serving all 8 divisions of Bangladesh",
                                "24/7 support for families",
                                "Transparent pricing, no hidden fees",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <FiCheckCircle className="text-primary flex-shrink-0 text-lg" />
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES ── */}
            <section className="py-20 bg-white dark:bg-[#1A2E1E]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">What Drives Us</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Our Core Values</h2>
                    </div>
                    <div
                        ref={valuesRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {values.map((v, i) => (
                            <div
                                key={i}
                                style={{
                                    opacity: valuesIn ? 1 : 0,
                                    transform: valuesIn ? "translateY(0)" : "translateY(40px)",
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

            {/* ── TIMELINE ── */}
            <section className="py-20 bg-background">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">How We Grew</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Our Journey</h2>
                    </div>
                    <div ref={timelineRef} className="relative">
                        {/* vertical line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 dark:bg-primary/30 -translate-x-1/2" />

                        {milestones.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    opacity: timelineIn ? 1 : 0,
                                    transform: timelineIn ? "translateY(0)" : "translateY(30px)",
                                    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                                }}
                                className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* dot */}
                                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10" />

                                {/* card */}
                                <div className={`ml-14 md:ml-0 md:w-[45%] bg-white dark:bg-[#1A2E1E] rounded-2xl p-5 shadow-sm hover:shadow-md transition ${i % 2 === 0 ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
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

            {/* ── TEAM ── */}
            <section className="py-20 bg-white dark:bg-[#1A2E1E]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">The People Behind</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Meet Our Team</h2>
                        <p className="text-muted mt-3 max-w-xl mx-auto">Passionate professionals dedicated to making caregiving accessible for every family.</p>
                    </div>

                    <div
                        ref={teamRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {team.map((member, i) => (
                            <div
                                key={i}
                                style={{
                                    opacity: teamIn ? 1 : 0,
                                    transform: teamIn ? "translateY(0)" : "translateY(40px)",
                                    transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
                                }}
                                className="bg-background dark:bg-[#0F1A12] rounded-3xl p-6 text-center hover:shadow-lg transition group"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-all"
                                    />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                                <p className="text-primary text-sm font-semibold mb-2">{member.role}</p>
                                <p className="text-muted text-xs leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACT INFO ── */}
            <section className="py-20 bg-background">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Get In Touch</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Contact Us</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <FiMapPin className="text-2xl" />, title: "Address", info: "Dhaka, Bangladesh", sub: "Serving all 8 divisions" },
                            { icon: <FiPhone className="text-2xl" />, title: "Phone", info: "+880 1700 000000", sub: "Available 24/7" },
                            { icon: <FiMail className="text-2xl" />, title: "Email", info: "support@care.xyz", sub: "Reply within 24 hours" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    opacity: ctaIn ? 1 : 0,
                                    transform: ctaIn ? "translateY(0)" : "translateY(30px)",
                                    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                                }}
                                className="bg-white dark:bg-[#1A2E1E] rounded-3xl p-6 text-center shadow-sm hover:shadow-md transition"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                <p className="text-primary font-semibold text-sm">{item.info}</p>
                                <p className="text-muted text-xs mt-1">{item.sub}</p>
                            </div>
                        ))}
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
                        Join the Care.xyz Family
                    </h2>
                    <p className="text-lg opacity-80 mb-8">
                        Become part of Bangladesh's most trusted care community today.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-accent text-gray-900 font-bold rounded-2xl hover:bg-yellow-400 transition shadow-xl text-lg"
                        >
                            Get Started Free →
                        </Link>
                        <Link
                            href="/services"
                            className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition text-lg"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}