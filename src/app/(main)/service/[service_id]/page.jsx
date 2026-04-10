import Image from "next/image";
import Link from "next/link";
import { FiClock, FiMapPin, FiShield, FiStar, FiCheckCircle, FiArrowLeft } from "react-icons/fi";

const servicesData = {
    "baby-care": {
        id: "baby-care",
        title: "Baby Care",
        tagline: "Safe, loving, professional care for your little ones",
        description: "Our certified babysitters provide a safe, nurturing environment for your children. Whether you need a few hours of help or full-day care, our trained professionals ensure your baby is happy, engaged, and well looked after.",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=80",
        icon: "👶",
        charge: 500,
        duration_types: ["hours", "days"],
        features: [
            "Certified & background-checked babysitters",
            "Age-appropriate activities & play",
            "Feeding, bathing & nap routines",
            "Real-time updates to parents",
            "Emergency first aid trained",
            "Available 24/7 on demand",
        ],
        faqs: [
            { q: "What age groups do you cover?", a: "We cover newborns to 12 years old." },
            { q: "Can I choose my babysitter?", a: "Yes, you can view profiles and select your preferred caretaker." },
            { q: "What if I need to cancel?", a: "You can cancel up to 2 hours before the booking starts." },
        ],
    },
    "elderly-care": {
        id: "elderly-care",
        title: "Elderly Care",
        tagline: "Compassionate care for your elderly loved ones at home",
        description: "Our trained elderly care attendants provide companionship, medical assistance, and daily support for your aging parents or relatives — all from the comfort of their own home.",
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&q=80",
        icon: "🧓",
        charge: 600,
        duration_types: ["hours", "days"],
        features: [
            "Trained elderly care specialists",
            "Medication reminders & health monitoring",
            "Mobility assistance & fall prevention",
            "Companionship & emotional support",
            "Meal preparation & feeding",
            "Regular family progress updates",
        ],
        faqs: [
            { q: "Do caretakers have medical training?", a: "Yes, all elderly care attendants have basic medical training." },
            { q: "Can they stay overnight?", a: "Yes, we offer overnight care packages." },
            { q: "Is this available outside Dhaka?", a: "Yes, we cover all 8 divisions of Bangladesh." },
        ],
    },
    "sick-care": {
        id: "sick-care",
        title: "Sick People Care",
        tagline: "Expert home care for sick and recovering family members",
        description: "Our professional attendants are trained to care for sick or recovering individuals at home. From post-surgery recovery to chronic illness management, we provide the right care at the right time.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
        icon: "🏥",
        charge: 700,
        duration_types: ["hours", "days"],
        features: [
            "Post-surgery & recovery care",
            "Chronic illness management",
            "Wound dressing & hygiene care",
            "Medication administration support",
            "Doctor visit assistance",
            "24/7 emergency response",
        ],
        faqs: [
            { q: "Can attendants administer medicine?", a: "They can assist with medication reminders and support." },
            { q: "What illnesses do you cover?", a: "We cover a wide range including post-surgery, diabetes, stroke recovery and more." },
            { q: "Is equipment provided?", a: "Basic medical equipment is available on request." },
        ],
    },
};

export async function generateMetadata({ params }) {
    const { service_id } = await params;
    const service = servicesData[service_id];
    if (!service) return { title: "Service Not Found" };
    return {
        title: `${service.title} | Care.xyz`,
        description: service.description,
    };
}

export default async function ServiceDetailPage({ params }) {
    const { service_id } = await params;
    const service = servicesData[service_id];
    // ... rest of the code stays exactly the same

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <p className="text-2xl font-bold text-gray-800">Service not found</p>
                <Link href="/" className="mt-4 text-primary hover:underline">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">

            {/* ── HERO ── */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 pb-10">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition w-fit"
                    >
                        <FiArrowLeft /> Back to Home
                    </Link>
                    <span className="text-4xl mb-2">{service.icon}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        {service.title}
                    </h1>
                    <p className="text-white/80 text-lg">{service.tagline}</p>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left — Details */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Description */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
                        <p className="text-muted leading-relaxed text-base">{service.description}</p>
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.features.map((f, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <FiCheckCircle className="text-primary mt-0.5 flex-shrink-0 text-lg" />
                                    <span className="text-gray-700 text-sm">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {service.faqs.map((faq, i) => (
                                <div key={i} className="border border-cborder rounded-2xl p-5">
                                    <p className="font-semibold text-gray-900 mb-1">Q: {faq.q}</p>
                                    <p className="text-muted text-sm">A: {faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — Booking Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">
                        <div className="text-center mb-6">
                            <span className="text-5xl">{service.icon}</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-3">{service.title}</h3>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <FiStar key={s} className="text-accent fill-accent text-sm" />
                                ))}
                                <span className="text-muted text-xs ml-1">(4.9)</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between py-3 border-b border-cborder">
                                <div className="flex items-center gap-2 text-muted text-sm">
                                    <FiClock /> Service Charge
                                </div>
                                <span className="font-bold text-gray-900">৳{service.charge}/hr</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-cborder">
                                <div className="flex items-center gap-2 text-muted text-sm">
                                    <FiMapPin /> Coverage
                                </div>
                                <span className="font-bold text-gray-900">All 8 Divisions</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-cborder">
                                <div className="flex items-center gap-2 text-muted text-sm">
                                    <FiShield /> Verified
                                </div>
                                <span className="font-bold text-green-600">100% Trusted</span>
                            </div>
                        </div>

                        <Link
                            href={`/booking/${service.id}`}
                            className="block w-full text-center bg-primary text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition shadow-lg shadow-green-200 text-lg"
                        >
                            Book This Service →
                        </Link>
                        <p className="text-center text-xs text-muted mt-3">
                            You'll be asked to login if not already signed in
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}