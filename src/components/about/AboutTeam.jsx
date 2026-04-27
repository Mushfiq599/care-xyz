"use client";
import Image from "next/image";
import useInView from "@/hooks/useInView";

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

export default function AboutTeam() {
    const [ref, inView] = useInView();

    return (
        <section className="py-20 bg-white dark:bg-[#1A2E1E]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        The People Behind
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                        Meet Our Team
                    </h2>
                    <p className="text-muted mt-3 max-w-xl mx-auto">
                        Passionate professionals dedicated to making caregiving accessible for every family.
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(40px)",
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
    );
}