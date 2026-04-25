"use client";
import { useEffect, useState } from "react";
import { FiLoader, FiDollarSign, FiTrendingUp, FiCreditCard } from "react-icons/fi";

export default function AdminPaymentsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/admin/bookings")
            .then(res => res.json())
            .then(data => {
                const paid = data.bookings?.filter(b => b.paymentStatus === "paid") || [];
                setBookings(paid);
                setTotalRevenue(paid.reduce((sum, b) => sum + b.totalCost, 0));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = bookings.filter(b =>
        b.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
        b.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
        b.paymentIntentId?.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (d) => new Date(d).toLocaleDateString("en-BD", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit"
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

            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-white">Payment History</h1>
                <p className="text-gray-400 mt-1">All successful Stripe payments.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                    <div className="w-10 h-10 rounded-xl bg-green-900/30 text-green-400 flex items-center justify-center mb-3">
                        <FiDollarSign />
                    </div>
                    <p className="text-2xl font-extrabold text-white">৳{totalRevenue}</p>
                    <p className="text-gray-400 text-sm mt-1">Total Revenue</p>
                </div>

                <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center mb-3">
                        <FiCreditCard />
                    </div>
                    <p className="text-2xl font-extrabold text-white">{bookings.length}</p>
                    <p className="text-gray-400 text-sm mt-1">Total Transactions</p>
                </div>

                <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                    <div className="w-10 h-10 rounded-xl bg-yellow-900/30 text-yellow-400 flex items-center justify-center mb-3">
                        <FiTrendingUp />
                    </div>
                    <p className="text-2xl font-extrabold text-white">
                        ৳{bookings.length ? Math.round(totalRevenue / bookings.length) : 0}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">Average per Booking</p>
                </div>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by email, service or payment ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
            />

            {/* Table */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                    <h2 className="font-bold text-white">
                        All Transactions
                        <span className="ml-2 text-xs text-gray-400 font-normal">
                            ({filtered.length} records)
                        </span>
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-left">
                                <th className="px-6 py-3 font-medium">#</th>
                                <th className="px-6 py-3 font-medium">Payment ID</th>
                                <th className="px-6 py-3 font-medium">User</th>
                                <th className="px-6 py-3 font-medium">Service</th>
                                <th className="px-6 py-3 font-medium">Duration</th>
                                <th className="px-6 py-3 font-medium">Amount</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((b, i) => (
                                <tr
                                    key={b._id}
                                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition"
                                >
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {i + 1}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs font-mono">
                                        {b.paymentIntentId
                                            ? `${b.paymentIntentId.slice(0, 18)}...`
                                            : "—"
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 text-xs max-w-[150px] truncate">
                                        {b.userEmail}
                                    </td>
                                    <td className="px-6 py-4 text-white font-medium">
                                        {b.serviceName}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {b.duration} {b.durationType}
                                    </td>
                                    <td className="px-6 py-4 text-primary font-bold">
                                        ৳{b.totalCost}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">
                                        {formatDate(b.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                                            💳 Paid
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                                        No payment records found
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