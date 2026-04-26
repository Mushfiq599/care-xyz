"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import DurationStep from "@/components/booking/DurationStep";
import LocationStep from "@/components/booking/LocationStep";
import ReviewStep from "@/components/booking/ReviewStep";
import BookingSuccess from "@/components/booking/BookingSuccess";

const STEPS = ["Duration", "Location", "Review & Pay"];

export default function BookingPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();

    const [serviceId, setServiceId] = useState(null);
    const [service, setService] = useState(null);
    const [locationData, setLocationData] = useState({});
    const [pageLoading, setPageLoading] = useState(true);

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

    // Total cost
    const multiplier = durationType === "days" ? 8 : 1;
    const totalCost = service ? duration * service.charge * multiplier : 0;

    // Booking data for payment
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
            } catch {
                setError("Failed to load data. Please refresh.");
            } finally {
                setPageLoading(false);
            }
        };
        fetchData();
    }, [serviceId]);

    const handleNext = () => {
        if (step === 0 && (!duration || duration < 1))
            return setError("Please enter a valid duration.");
        if (step === 1 && (!division || !district || !city || !area.trim() || !address.trim()))
            return setError("Please fill in all location fields including area.");
        setError("");
        setStep(s => s + 1);
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

    if (success) {
        return (
            <BookingSuccess
                service={service}
                duration={duration}
                durationType={durationType}
                city={city}
                district={district}
                division={division}
                area={area}
                totalCost={totalCost}
            />
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

                    {step === 0 && (
                        <DurationStep
                            duration={duration}
                            setDuration={setDuration}
                            durationType={durationType}
                            setDurationType={setDurationType}
                            totalCost={totalCost}
                            serviceCharge={service?.charge}
                        />
                    )}

                    {step === 1 && (
                        <LocationStep
                            locationData={locationData}
                            division={division} setDivision={setDivision}
                            district={district} setDistrict={setDistrict}
                            city={city} setCity={setCity}
                            area={area} setArea={setArea}
                            address={address} setAddress={setAddress}
                        />
                    )}

                    {step === 2 && (
                        <ReviewStep
                            service={service}
                            duration={duration}
                            durationType={durationType}
                            division={division}
                            district={district}
                            city={city}
                            area={area}
                            address={address}
                            totalCost={totalCost}
                            bookingData={bookingData}
                            onSuccess={() => setSuccess(true)}
                            onError={(msg) => setError(msg)}
                            onBack={() => { setStep(1); setError(""); }}
                        />
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
                </div>
            </div>
        </div>
    );
}