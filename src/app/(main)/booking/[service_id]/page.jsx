"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/PaymentForm";
import {
    FiClock, FiMapPin, FiDollarSign,
    FiCheckCircle, FiAlertCircle, FiLoader, FiLock
} from "react-icons/fi";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const STEPS = ["Duration", "Location", "Review & Pay"];

export default function BookingPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();

    const [serviceId, setServiceId] = useState(null);
    const [service, setService] = useState(null);
    const [locationData, setLocationData] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [creatingIntent, setCreatingIntent] = useState(false);

    const [step, setStep] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [duration, setDuration] = useState(1);
    const [durationType, setDurationType] = useState("hours");
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
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

    // Booking data
    const bookingData = {
        serviceId,
        serviceName: service?.title,
        duration,
        durationType,
        location: { division, district, city, area, address },
        totalCost,
    };

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
                if (!found) { router.push("/"); return; }
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
            if (!division || !district || !city || !area.trim() || !address.trim())
                return setError("Please fill in all location fields including area.");
        }
        setError("");
        setStep(s => s + 1);
    };

    // Create payment intent when reaching step 2
    useEffect(() => {
        if (step === 2 && !clientSecret && service) {
            setCreatingIntent(true);
            fetch("/api/payments/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    totalCost,
                    serviceName: service.title,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    setClientSecret(data.clientSecret);
                    setCreatingIntent(false);
                })
                .catch(() => {
                    setError("Failed to initialize payment. Please try again.");
                    setCreatingIntent(false);
                });
        }
    }, [step, service]);

    const handlePaymentSuccess = () => {
        setSuccess(true);
    };

    const handlePaymentError = (msg) => {
        setError(msg);
    };

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
                        Payment Successful! 🎉
                    </h2>
                    <p className="text-muted mb-6">
                        Your booking has been confirmed and payment received.
                    </p>
                    <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 text-left space-y-3 mb-6">
                        {[
                            { label: "Service", value: `${service.icon} ${service.title}` },
                            { label: "Duration", value: `${duration} ${durationType}` },
                            { label: "Area", value: area },
                            { label: "Location", value: `${city}, ${district}, ${division}` },
                            { label: "Total Paid", value: `৳${totalCost}` },
                            { label: "Payment", value: "✅ Paid via Stripe" },
                            { label: "Status", value: "⏳ Pending" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <span className="text-sm text-muted">{item.label}</span>
                                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
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

                {/* Card */}
                <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-lg p-8">

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl p-4 mb-6 text-sm">
                            <FiAlertCircle className="flex-shrink-0" /> {error}
                        </div>
                    )}

                    {/* ── STEP 0: Duration ── */}
                    {step === 0 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FiClock className="text-primary" /> Select Duration
                            </h2>
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
                            <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 flex items-center justify-between border border-cborder dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-muted uppercase tracking-wide mb-1">Estimated Total</p>
                                    <p className="text-4xl font-extrabold text-primary">৳{totalCost}</p>
                                </div>
                                <div className="text-right text-sm text-muted">
                                    <p className="font-medium">{duration} {durationType}</p>
                                    <p>× ৳{service?.charge}/hr</p>
                                    {durationType === "days" && <p className="text-xs">× 8 hrs/day</p>}
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
                                    City / Upazila
                                </label>
                                <select
                                    value={city}
                                    onChange={e => { setCity(e.target.value); setArea(""); }}
                                    disabled={!district}
                                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary disabled:opacity-50 dark:bg-[#0F1A12] dark:text-white"
                                >
                                    <option value="">Select City</option>
                                    {cities.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Area */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Area
                                </label>
                                <input
                                    type="text"
                                    value={area}
                                    onChange={e => setArea(e.target.value)}
                                    placeholder="e.g. Gulshan-1, Dhanmondi-15, Agrabad"
                                    disabled={!city}
                                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary disabled:opacity-50 dark:bg-[#0F1A12] dark:text-white"
                                />
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

                    {/* ── STEP 2: Review & Pay ── */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FiDollarSign className="text-primary" /> Review & Pay
                            </h2>

                            <div className="divide-y divide-cborder dark:divide-gray-700">
                                {[
                                    { label: "Service", value: `${service.icon} ${service.title}` },
                                    { label: "Duration", value: `${duration} ${durationType}` },
                                    { label: "Division", value: division },
                                    { label: "District", value: district },
                                    { label: "City", value: city },
                                    { label: "Area", value: area },
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

                            {/* Total */}
                            <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted uppercase tracking-wide mb-1">Total Amount</p>
                                    <p className="text-4xl font-extrabold text-primary">৳{totalCost}</p>
                                </div>
                                <FiLock className="text-primary text-3xl opacity-50" />
                            </div>

                            {/* Stripe Payment */}
                            {creatingIntent ? (
                                <div className="flex items-center justify-center py-8 gap-3 text-muted">
                                    <FiLoader className="animate-spin text-primary text-2xl" />
                                    <span>Initializing secure payment...</span>
                                </div>
                            ) : clientSecret ? (
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        clientSecret,
                                        appearance: {
                                            theme: "stripe",
                                            variables: {
                                                colorPrimary: "#16A34A",
                                                colorBackground: "#ffffff",
                                                borderRadius: "12px",
                                            },
                                        },
                                    }}
                                >
                                    <PaymentForm
                                        bookingData={bookingData}
                                        onSuccess={handlePaymentSuccess}
                                        onError={handlePaymentError}
                                    />
                                </Elements>
                            ) : null}
                        </div>
                    )}

                    {/* Navigation — steps 0 and 1 only */}
                    {step < 2 && (
                        <div className="flex gap-4 mt-8">
                            {step > 0 && (
                                <button
                                    onClick={() => { setStep(s => s - 1); setError(""); }}
                                    className="flex-1 py-3 border-2 border-cborder dark:border-gray-600 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition"
                                >
                                    ← Back
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="flex-1 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition shadow-lg"
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {/* Back button on payment step */}
                    {step === 2 && (
                        <button
                            onClick={() => { setStep(1); setClientSecret(""); setError(""); }}
                            className="mt-4 w-full py-3 border-2 border-cborder dark:border-gray-600 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition"
                        >
                            ← Back to Location
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}