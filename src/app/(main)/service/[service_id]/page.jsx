import Image from "next/image";
import Link from "next/link";
import { FiClock, FiMapPin, FiShield, FiStar, FiCheckCircle, FiArrowLeft } from "react-icons/fi";

async function getService(id) {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/services`,
        { cache: "no-store" }
    );
    const services = await res.json();
    return services.find(s => s.id === id) || null;
}

export async function generateMetadata({ params }) {
    const { service_id } = await params;
    const service = await getService(service_id);
    if (!service) return { title: "Service Not Found" };
    return {
        title: `${service.title} | Care.xyz`,
        description: service.description,
    };
}

export default async function ServiceDetailPage({ params }) {
    const { service_id } = await params;
    const service = await getService(service_id);

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
                {/* Left */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
                        <p className="text-muted leading-relaxed">{service.description}</p>
                    </div>

                    <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl p-8 shadow-sm">
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

                    <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {service.faqs.map((faq, i) => (
                                <div key={i} className="border border-cborder dark:border-gray-700 rounded-2xl p-5">
                                    <p className="font-semibold text-gray-900 mb-1">Q: {faq.q}</p>
                                    <p className="text-muted text-sm">A: {faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — Booking Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-lg p-8 sticky top-24">
                        <div className="text-center mb-6">
                            <span className="text-5xl">{service.icon}</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-3">{service.title}</h3>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <FiStar key={s} className="text-accent text-sm" />
                                ))}
                                <span className="text-muted text-xs ml-1">(4.9)</span>
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <div className="flex items-center justify-between py-3 border-b border-cborder dark:border-gray-700">
                                <div className="flex items-center gap-2 text-muted text-sm">
                                    <FiClock /> Service Charge
                                </div>
                                <span className="font-bold text-gray-900">৳{service.charge}/hr</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-cborder dark:border-gray-700">
                                <div className="flex items-center gap-2 text-muted text-sm">
                                    <FiMapPin /> Coverage
                                </div>
                                <span className="font-bold text-gray-900">All 8 Divisions</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-cborder dark:border-gray-700">
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