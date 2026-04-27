"use client";
import Link from "next/link";
import useInView from "@/hooks/useInView";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AboutCTA() {
    const [ref, inView] = useInView();

    return (
        <section className="py-20 bg-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div
                ref={ref}
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(30px)",
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
                        className="flex items-center gap-1 px-8 py-4 bg-accent text-gray-900 font-bold rounded-2xl hover:bg-yellow-400 transition shadow-xl text-lg">
                        Get Started Free <FaArrowRightLong />
                    </Link>
                    <Link
                        href="/services"
                        className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition text-lg">
                        View Services
                    </Link>
                </div>
            </div>
        </section>
    );
}