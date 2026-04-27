"use client";
import { useState, useEffect } from "react";
import { FiDollarSign, FiLock, FiLoader } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/PaymentForm";
import { FaArrowLeft } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function ReviewStep({
    service,
    duration, durationType,
    division, district, city, area, address,
    totalCost,
    bookingData,
    onSuccess,
    onError,
    onBack,
}) {
    const [clientSecret, setClientSecret] = useState("");
    const [creatingIntent, setCreatingIntent] = useState(false);

    useEffect(() => {
        if (!clientSecret && service) {
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
                    onError("Failed to initialize payment. Please try again.");
                    setCreatingIntent(false);
                });
        }
    }, [clientSecret, service, totalCost, onError]);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiDollarSign className="text-primary" /> Review & Pay
            </h2>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
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

            <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-5 flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted uppercase tracking-wide mb-1">Total Amount</p>
                    <p className="flex items-center text-4xl font-extrabold text-primary">
                        <TbCurrencyTaka size={40}/>
                        {totalCost}
                    </p>
                </div>
                <FiLock className="text-primary text-3xl opacity-50" />
            </div>

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
                    }}>
                    <PaymentForm
                        bookingData={bookingData}
                        onSuccess={onSuccess}
                        onError={onError}/>
                </Elements>
            ) : null}

            <button
                onClick={onBack}
                className="w-full py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition flex items-center justify-center gap-2">
                <FaArrowLeft />
                Back to Location
            </button>
        </div>
    );      
}