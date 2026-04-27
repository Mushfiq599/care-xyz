"use client";
import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { FiLoader, FiLock, FiXCircle } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";

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
            const { error: stripeError, paymentIntent } =
                await stripe.confirmPayment({
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
            <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                <PaymentElement
                    options={{
                        layout: "tabs",
                    }}/>
            </div>
            {error && (
                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm p-4 rounded-xl">
                    <FiXCircle />
                    {error}
                </div>
            )}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2 text-lg hover:scale-[1.02] active:scale-[0.98]">
                {loading ? (
                    <>
                        <FiLoader className="animate-spin" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <FiLock />
                        Pay
                        <span className="flex items-center gap-1">
                            <TbCurrencyTaka />
                            {bookingData.totalCost}
                        </span>
                        Now
                    </>
                )}
            </button>
            <p className="text-center text-xs text-muted flex items-center justify-center gap-1">
                <FiLock className="text-primary" />
                Secured by Stripe — Your payment info is encrypted
            </p>
        </form>
    );
}