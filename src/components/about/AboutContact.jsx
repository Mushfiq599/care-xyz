"use client";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import useInView from "@/hooks/useInView";

const contacts = [
    { icon: <FiMapPin className="text-2xl" />, title: "Address", info: "Dhaka, Bangladesh", sub: "Serving all 8 divisions" },
    { icon: <FiPhone className="text-2xl" />, title: "Phone", info: "+880 1700 000000", sub: "Available 24/7" },
    { icon: <FiMail className="text-2xl" />, title: "Email", info: "mellowm678@gmail.com", sub: "Reply within 24 hours" },
];

export default function AboutContact() {
    const [ref, inView] = useInView();

    return (
        <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                        Contact Us
                    </h2>
                </div>
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contacts.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(30px)",
                                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                            }}
                            className="bg-white dark:bg-[#1A2E1E] rounded-3xl p-6 text-center shadow-sm hover:shadow-md transition">
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
    );
}