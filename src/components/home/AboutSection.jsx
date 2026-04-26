"use client";
import Image from "next/image";

export default function AboutSection() {
    return (
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
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Who We Are
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
                        Bangladesh's Most Trusted Care Platform
                    </h2>
                    <p className="text-muted leading-relaxed mb-4">
                        Care.xyz was founded with one mission — to make quality caregiving accessible
                        to every family in Bangladesh. Whether you need a babysitter for your child,
                        a companion for your elderly parent, or an attendant for a sick family member,
                        we've got you covered.
                    </p>
                    <p className="text-muted leading-relaxed mb-6">
                        All our caretakers are background-checked, trained, and reviewed by real
                        families. We operate across all 8 divisions of Bangladesh.
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
    );
}