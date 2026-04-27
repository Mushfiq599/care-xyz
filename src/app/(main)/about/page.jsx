"use client";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutTeam from "@/components/about/AboutTeam";
import AboutContact from "@/components/about/AboutContact";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
    return (
        <div className="overflow-x-hidden bg-background">
            <AboutHero />
            <AboutStats />
            <AboutMission />
            <AboutValues />
            <AboutTimeline />
            <AboutTeam />
            <AboutContact />
            <AboutCTA />
        </div>
    );
}