"use client";
import { useEffect, useState } from "react";
import { FiLoader, FiAlertCircle } from "react-icons/fi";

const statusConfig = {
    pending: { color: "text-yellow-400", bg: "bg-yellow-900/30" },
    confirmed: { color: "text-blue-400", bg: "bg-blue-900/30" },
    completed: { color: "text-green-400", bg: "bg-green-900/30" },
    cancelled: { color: "text-red-400", bg: "bg-red-900/30" },
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);
    const [filter, setFilter] = useState("all");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/admin/bookings");
            const data = await res.json();
            setBookings(data.bookings || []);
        } catch (err) {
            setError("Failed to load bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, []);

    const handleStatusChange = async (id, newStatus) => {
        setUpdating(id);
        setError("");
        try {
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error("Update failed");
            setSuccess(`Booking updated to ${newStatus}`);
            setTimeout(() => setSuccess(""), 3000);
            fetchBookings();
        } catch {
            setError("Failed to update booking.");
        } finally {
            setUpdating(null);
        }
    };

    const filtered = filter === "all"
        ? bookings
        : bookings.filter(b => b.status === filter);

    const formatDate = (d) => new Date(d).toLocaleDateString("en-BD", {
        day: "numeric", month: "short", year: "numeric"
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <FiLoader className="animate-spin text-primary text-4xl" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-white">Manage Bookings</h1>
                <p className="text-gray-400 mt-1">View and update all booking statuses.</p>
            </div>

            {success && (
                <div className="bg-green-900/30 text-green-400 rounded-xl p-4 text-sm">
                    ✅ {success}
                </div>
            )}
            {error && (
                <div className="bg-red-900/30 text-red-400 rounded-xl p-4 text-sm flex items-center gap-2">
                    <FiAlertCircle /> {error}
                </div>
            )}

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
                {["all", "pending", "confirmed", "completed", "cancelled"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition ${filter === f
                                ? "bg-primary text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                    >
                        {f} {f === "all" ? `(${bookings.length})` : `(${bookings.filter(b => b.status === f).length})`}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-left">
                                <th className="px-6 py-3 font-medium">User</th>
                                <th className="px-6 py-3 font-medium">Service</th>
                                <th className="px-6 py-3 font-medium">Duration</th>
                                <th className="px-6 py-3 font-medium">Location</th>
                                <th className="px-6 py-3 font-medium">Cost</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(b => {
                                const config = statusConfig[b.status] || statusConfig.pending;
                                return (
                                    <tr key={b._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                                        <td className="px-6 py-4 text-gray-300 text-xs">{b.userEmail}</td>
                                        <td className="px-6 py-4 text-white font-medium">{b.serviceName}</td>
                                        <td className="px-6 py-4 text-gray-400">{b.duration} {b.durationType}</td>
                                        <td className="px-6 py-4 text-gray-400">{b.location?.district}, {b.location?.division}</td>
                                        <td className="px-6 py-4 text-primary font-bold">৳{b.totalCost}</td>
                                        <td className="px-6 py-4 text-gray-400">{formatDate(b.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={b.status}
                                                onChange={e => handleStatusChange(b._id, e.target.value)}
                                                disabled={updating === b._id}
                                                className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-primary disabled:opacity-50"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                                        No bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}