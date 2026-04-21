"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import {
    FiClock, FiMapPin, FiDollarSign,
    FiCheckCircle, FiAlertCircle, FiLoader
} from "react-icons/fi";

const STEPS = ["Duration", "Location", "Review & Confirm"];

export default function BookingPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();

    const [serviceId, setServiceId] = useState(null);
    const [service, setService] = useState(null);
    const [locationData, setLocationData] = useState({});
    const [pageLoading, setPageLoading] = useState(true);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [duration, setDuration] = useState(1);
    const [durationType, setDurationType] = useState("hours");
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");

    // Derived location options
    const districts = division
        ? (locationData[division] || []).map(d => d.district)
        : [];
    const cities = district
        ? (locationData[division] || []).find(d => d.district === district)?.cities || []
        : [];
    // Total cost (1 day = 8 hours)
    const multiplier = durationType === "days" ? 8 : 1;
    const totalCost = service ? duration * service.charge * multiplier : 0;

    // Resolve params
    useEffect(() => {
        const resolve = async () => {
            const resolved = await params;
            setServiceId(resolved.service_id);
        };
        resolve();
    }, [params]);

    // Auth guard
    useEffect(() => {
        if (status === "unauthenticated" && serviceId) {
            router.push(`/login?callbackUrl=/booking/${serviceId}`);
        }
    }, [status, serviceId]);

    // Fetch service + locations
    useEffect(() => {
        if (!serviceId) return;
        const fetchData = async () => {
            try {
                const [servicesRes, locationsRes] = await Promise.all([
                    fetch("/api/services"),
                    fetch("/api/locations"),
                ]);
                const services = await servicesRes.json();
                const locations = await locationsRes.json();
                const found = services.find(s => s.id === serviceId);
                if (!found) {
                    router.push("/");
                    return;
                }
                setService(found);
                setLocationData(locations);
            } catch (err) {
                setError("Failed to load data. Please refresh.");
            } finally {
                setPageLoading(false);
            }
        };
        fetchData();
    }, [serviceId]);

    const handleNext = () => {
        if (step === 0) {
            if (!duration || duration < 1)
                return setError("Please enter a valid duration.");
        }
        if (step === 1) {
            if (!division || !district || !city || !address.trim())
                return setError("Please fill in all location fields.");
        }
        setError("");
        setStep(s => s + 1);
    };

    const handleConfirm = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    serviceId,
                    serviceName: service.title,
                    duration,
                    durationType,
                    location: { division, district, city, address },
                    totalCost,
                }),
            });
            const data = await res.json();
            if (!res.ok) return setError(data.message || "Booking failed.");
            setSuccess(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Loading screen
    if (status === "loading" || pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <FiLoader className="animate-spin text-primary text-4xl mx-auto mb-4" />
                    <p className="text-muted">Loading booking details...</p>
                </div>
            </div>
        );
    }

    // Success screen
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="text-primary text-4xl" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                        Booking Confirmed! 🎉
                    </h2>
                    <p className="text-muted mb-6">
                        Your booking has been submitted successfully.
                    </p>
                    <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 text-left space-y-3 mb-6">
                        {[
                            { label: "Service", value: `${service.icon} ${service.title}` },
                            { label: "Duration", value: `${duration} ${durationType}` },
                            { label: "Location", value: `${city}, ${district}, ${division}` },
                            { label: "Total Cost", value: `৳${totalCost}` },
                            { label: "Status", value: "⏳ Pending" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <span className="text-sm text-muted">{item.label}</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => router.push("/my-bookings")}
                        className="w-full bg-primary text-white font-bold py-3 rounded-2xl hover:bg-green-700 transition"
                    >
                        View My Bookings →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <span className="text-5xl">{service?.icon}</span>
                    <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
                        Book {service?.title}
                    </h1>
                    <p className="text-muted mt-1">
                        ৳{service?.charge}/hr • Complete the steps below
                    </p>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-center mb-10">
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex items-center">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${i === step
                                ? "bg-primary text-white shadow-lg"
                                : i < step
                                    ? "bg-green-100 text-primary dark:bg-green-900"
                                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                                }`}>
                                <span>{i < step ? "✓" : i + 1}</span>
                                <span className="hidden sm:inline">{s}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-8 h-0.5 mx-1 ${i < step ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-lg p-8">

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl p-4 mb-6 text-sm">
                            <FiAlertCircle className="flex shrink-0" /> {error}
                        </div>
                    )}

                    {/* ── STEP 0: Duration ── */}
                    {step === 0 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FiClock className="text-primary" /> Select Duration
                            </h2>

                            {/* Type toggle */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Duration Type
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    {["hours", "days"].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => { setDurationType(type); setDuration(1); }}
                                            className={`py-4 rounded-2xl font-semibold border-2 transition capitalize text-sm ${durationType === type
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-cborder text-gray-500 hover:border-primary dark:border-gray-600 dark:text-gray-400"
                                                }`}
                                        >
                                            {type === "hours" ? "⏰ Hours" : "📅 Days"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    How many {durationType}?
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={durationType === "hours" ? 24 : 30}
                                    value={duration}
                                    onChange={e => setDuration(Math.max(1, Number(e.target.value)))}
                                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 text-xl font-bold focus:outline-none focus:border-primary dark:bg-[#0F1A12] dark:text-white text-center"
                                />
                                <p className="text-xs text-muted mt-1 text-center">
                                    Max: {durationType === "hours" ? "24 hours" : "30 days"}
                                </p>
                            </div>

                            {/* Live cost preview */}
                            <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 flex items-center justify-between border border-cborder dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-muted uppercase tracking-wide mb-1">
                                        Estimated Total
                                    </p>
                                    <p className="text-4xl font-extrabold text-primary">৳{totalCost}</p>
                                </div>
                                <div className="text-right text-sm text-muted">
                                    <p className="font-medium">{duration} {durationType}</p>
                                    <p>× ৳{service?.charge}/hr</p>
                                    {durationType === "days" && (
                                        <p className="text-xs">× 8 hrs/day</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 1: Location ── */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FiMapPin className="text-primary" /> Select Location
                            </h2>

                            {/* Division */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Division
                                </label>
                                <select
                                    value={division}
                                    onChange={e => {
                                        setDivision(e.target.value);
                                        setDistrict(""); setCity(""); setArea("");
                                    }}
                                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary dark:bg-[#0F1A12] dark:text-white"
                                >
                                    <option value="">Select Division</option>
                                    {Object.keys(locationData).map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            {/* District */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    District
                                </label>
                                <select
                                    value={district}
                                    onChange={e => {
                                        setDistrict(e.target.value);
                                        setCity(""); setArea("");
                                    }}
                                    disabled={!division}
                                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary disabled:opacity-50 dark:bg-[#0F1A12] dark:text-white"
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    City
                                </label>
                                <select
                                    value={city}
                                    onChange={e => {
                                        setCity(e.target.value);
                                        setArea("");
                                    }}
                                    disabled={!district}
                                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary disabled:opacity-50 dark:bg-[#0F1A12] dark:text-white"
                                >
                                    <option value="">Select City</option>
                                    {cities.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>



                            {/* Full Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Address
                                </label>
                                <textarea
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    placeholder="House no, road, landmark..."
                                    rows={3}
                                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary resize-none dark:bg-[#0F1A12] dark:text-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* ── STEP 2: Review ── */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FiDollarSign className="text-primary" /> Review & Confirm
                            </h2>

                            <div className="divide-y divide-cborder dark:divide-gray-700">
                                {[
                                    { label: "Service", value: `${service.icon} ${service.title}` },
                                    { label: "Duration", value: `${duration} ${durationType}` },
                                    { label: "Division", value: division },
                                    { label: "District", value: district },
                                    { label: "City", value: city },
                                    { label: "Address", value: address },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-start py-3">
                                        <span className="text-sm text-muted">{item.label}</span>
                                        <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%]">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total cost */}
                            <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-6 flex items-center justify-between mt-2">
                                <div>
                                    <p className="text-xs text-muted uppercase tracking-wide mb-1">Total Cost</p>
                                    <p className="text-4xl font-extrabold text-primary">৳{totalCost}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted mb-2">Booking Status</p>
                                    <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-full font-semibold text-sm">
                                        ⏳ Pending
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-muted text-center">
                                By confirming, you agree to our terms of service.
                            </p>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8">
                        {step > 0 && (
                            <button
                                onClick={() => { setStep(s => s - 1); setError(""); }}
                                className="flex-1 py-3 border-2 border-cborder dark:border-gray-600 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition"
                            >
                                ← Back
                            </button>
                        )}
                        {step < STEPS.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="flex-1 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition shadow-lg shadow-green-200"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                className="flex-1 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading
                                    ? <><FiLoader className="animate-spin" /> Processing...</>
                                    : "✓ Confirm Booking"
                                }
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}