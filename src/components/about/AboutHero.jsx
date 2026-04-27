"use client";
import Image from "next/image";
import Link from "next/link";
import useInView from "@/hooks/useInView";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AboutHero() {
    const [ref, inView] = useInView(0.1);

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80"
                    alt="About Care.xyz"
                    fill
                    className="object-cover"
                    priority/>
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            <div
                ref={ref}
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.9s ease, transform 0.9s ease",
                }}
                className="relative max-w-7xl mx-auto px-4">
                <span className="inline-block bg-primary/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest border border-green-500/30">
                    Our Story
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-2xl">
                    Caring for Bangladesh's
                    <span className="text-primary"> Families</span> Since 2019
                </h1>
                <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
                    We started with a simple belief — every family deserves access to trusted,
                    professional care for their loved ones, regardless of where they live.
                </p>
                <div className="flex gap-4 flex-wrap">
                    <Link
                        href="/services"
                        className="flex items-center gap-1 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg">
                        Our Services <FaArrowRightLong />
                    </Link>
                    <Link
                        href="/register"
                        className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition">
                        Join Us Today
                    </Link>
                </div>
            </div>
        </section>
    );
}