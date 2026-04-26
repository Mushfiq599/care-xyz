"use client";
import { useSession } from "next-auth/react";
import HeroSliders from "@/components/HeroSliders";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorks from "@/components/home/HowItWorks";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
    const { data: session } = useSession();

    return (
        <div className="overflow-x-hidden">
            <HeroSliders />
            <StatsSection />
            <ServicesSection />
            <HowItWorks />
            <AboutSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
}