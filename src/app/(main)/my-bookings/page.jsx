"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import BookingCard from "@/components/bookings/BookingCard";
import BookingStats from "@/components/bookings/BookingStats";
import EmptyBookings from "@/components/bookings/EmptyBookings";

export default function MyBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/my-bookings");
        }
    }, [status]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/bookings");
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setBookings(data.bookings);
        } catch (err) {
            setError("Failed to load bookings. Please refresh.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") fetchBookings();
    }, [status]);

    const handleCancel = async (id) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        setCancellingId(id);
        setError("");
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "cancelled" }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setSuccessMsg("Booking cancelled successfully.");
            setTimeout(() => setSuccessMsg(""), 3000);
            fetchBookings();
        } catch {
            setError("Failed to cancel booking. Please try again.");
        } finally {
            setCancellingId(null);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <FiLoader className="animate-spin text-primary text-4xl mx-auto mb-4" />
                    <p className="text-muted">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
                    <p className="text-muted mt-1">
                        Welcome back, {session?.user?.name?.split(" ")[0]}! Here are all your bookings.
                    </p>
                </div>

                {successMsg && (
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl p-4 mb-6 text-sm">
                        <FiCheckCircle /> {successMsg}
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl p-4 mb-6 text-sm">
                        <FiAlertCircle /> {error}
                    </div>
                )}

                {bookings.length === 0 ? (
                    <EmptyBookings />
                ) : (
                    <>
                        <BookingStats bookings={bookings} />

                        <div className="space-y-4">
                            {bookings.map(booking => (
                                <BookingCard
                                    key={booking._id}
                                    booking={booking}
                                    onCancel={handleCancel}
                                    cancellingId={cancellingId}/>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <button
                                onClick={() => router.push("/services")}
                                className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition shadow-lg shadow-green-200">
                                + Book Another Service
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}