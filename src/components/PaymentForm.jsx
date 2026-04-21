"use client";
import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { FiLoader, FiLock } from "react-icons/fi";

export default function PaymentForm({ bookingData, onSuccess, onError }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError("");

        try {
            // Confirm payment
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: { return_url: window.location.href },
                redirect: "if_required",
            });

            if (stripeError) {
                setError(stripeError.message);
                onError(stripeError.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                // Save booking to DB
                const res = await fetch("/api/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...bookingData,
                        paymentIntentId: paymentIntent.id,
                        paymentStatus: "paid",
                    }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                onSuccess(paymentIntent.id);
            }
        } catch (err) {
            setError(err.message || "Payment failed. Please try again.");
            onError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 border border-cborder dark:border-gray-700">
                <PaymentElement
                    options={{
                        layout: "tabs",
                    }}
                />
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 text-sm p-4 rounded-xl">
                    ❌ {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
            >
                {loading ? (
                    <><FiLoader className="animate-spin" /> Processing Payment...</>
                ) : (
                    <><FiLock /> Pay ৳{bookingData.totalCost} Now</>
                )}
            </button>

            <p className="text-center text-xs text-muted flex items-center justify-center gap-1">
                <FiLock className="text-primary" />
                Secured by Stripe — Your payment info is encrypted
            </p>
        </form>
    );
}