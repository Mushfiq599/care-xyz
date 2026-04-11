"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    FiClock, FiMapPin, FiDollarSign,
    FiLoader, FiAlertCircle, FiCalendar,
    FiXCircle, FiCheckCircle, FiPackage
} from "react-icons/fi";

const statusConfig = {
    pending: {
        label: "Pending",
        color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
        icon: "⏳",
    },
    confirmed: {
        label: "Confirmed",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
        icon: "✅",
    },
    completed: {
        label: "Completed",
        color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
        icon: "🎉",
    },
    cancelled: {
        label: "Cancelled",
        color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
        icon: "❌",
    },
};

const serviceIcons = {
    "baby-care": "👶",
    "elderly-care": "🧓",
    "sick-care": "🏥",
};

export default function MyBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Auth guard
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/my-bookings");
        }
    }, [status]);

    // Fetch bookings
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

    // Cancel booking
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
        } catch (err) {
            setError("Failed to cancel booking. Please try again.");
        } finally {
            setCancellingId(null);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-BD", {
            day: "numeric", month: "short", year: "numeric",
        });
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

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
                    <p className="text-muted mt-1">
                        Welcome back, {session?.user?.name?.split(" ")[0]}! Here are all your bookings.
                    </p>
                </div>

                {/* Success message */}
                {successMsg && (
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl p-4 mb-6 text-sm">
                        <FiCheckCircle /> {successMsg}
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl p-4 mb-6 text-sm">
                        <FiAlertCircle /> {error}
                    </div>
                )}

                {/* Stats row */}
                {bookings.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {["pending", "confirmed", "completed", "cancelled"].map(s => {
                            const count = bookings.filter(b => b.status === s).length;
                            const config = statusConfig[s];
                            return (
                                <div
                                    key={s}
                                    className="bg-white dark:bg-[#1A2E1E] rounded-2xl p-4 shadow-sm text-center"
                                >
                                    <p className="text-2xl font-extrabold text-gray-900">{count}</p>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.color}`}>
                                        {config.icon} {config.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty state */}
                {bookings.length === 0 ? (
                    <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-sm p-16 text-center">
                        <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h2>
                        <p className="text-muted mb-6">
                            You haven't made any bookings yet. Start by exploring our services.
                        </p>
                        <button
                            onClick={() => router.push("/#services")}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition"
                        >
                            Explore Services →
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => {
                            const config = statusConfig[booking.status] || statusConfig.pending;
                            const icon = serviceIcons[booking.serviceId] || "🏠";
                            return (
                                <div
                                    key={booking._id}
                                    className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-sm hover:shadow-md transition p-6"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                                        {/* Left — Service info */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                                                {icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-gray-900 text-lg">
                                                        {booking.serviceName}
                                                    </h3>
                                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.color}`}>
                                                        {config.icon} {config.label}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-muted">
                                                    <span className="flex items-center gap-1">
                                                        <FiClock className="text-primary" />
                                                        {booking.duration} {booking.durationType}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiMapPin className="text-primary" />
                                                        {booking.location?.area}, {booking.location?.district}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiCalendar className="text-primary" />
                                                        {formatDate(booking.createdAt)}
                                                    </span>
                                                    <span className="flex items-center gap-1 font-bold text-primary">
                                                        <FiDollarSign />
                                                        ৳{booking.totalCost}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right — Actions */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            {booking.status === "pending" && (
                                                <button
                                                    onClick={() => handleCancel(booking._id)}
                                                    disabled={cancellingId === booking._id}
                                                    className="flex items-center gap-2 px-4 py-2 border-2 border-red-300 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition text-sm font-semibold disabled:opacity-50"
                                                >
                                                    {cancellingId === booking._id ? (
                                                        <FiLoader className="animate-spin" />
                                                    ) : (
                                                        <FiXCircle />
                                                    )}
                                                    Cancel
                                                </button>
                                            )}
                                            <button
                                                onClick={() => router.push(`/service/${booking.serviceId}`)}
                                                className="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition text-sm font-semibold"
                                            >
                                                View Service
                                            </button>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="mt-4 pt-4 border-t border-cborder dark:border-gray-700">
                                        <p className="text-xs text-muted">
                                            📍 {booking.location?.address}, {booking.location?.area},
                                            {booking.location?.city}, {booking.location?.district},
                                            {booking.location?.division}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Book another */}
                {bookings.length > 0 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => router.push("/#services")}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition shadow-lg shadow-green-200"
                        >
                            + Book Another Service
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}