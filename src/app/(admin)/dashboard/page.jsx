"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FiUsers, FiCalendar, FiDollarSign,
    FiClock, FiCheckCircle, FiXCircle, FiLoader
} from "react-icons/fi";

const statusConfig = {
    pending: { color: "text-yellow-400", bg: "bg-yellow-900/30", icon: "⏳" },
    confirmed: { color: "text-blue-400", bg: "bg-blue-900/30", icon: "✅" },
    completed: { color: "text-green-400", bg: "bg-green-900/30", icon: "🎉" },
    cancelled: { color: "text-red-400", bg: "bg-red-900/30", icon: "❌" },
};

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, bookingsRes] = await Promise.all([
                    fetch("/api/admin/stats"),
                    fetch("/api/admin/bookings"),
                ]);
                const statsData = await statsRes.json();
                const bookingsData = await bookingsRes.json();
                setStats(statsData);
                // Show 5 most recent from ALL users
                setRecentBookings(bookingsData.bookings?.slice(0, 5) || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <FiLoader className="animate-spin text-primary text-4xl" />
            </div>
        );
    }

    const statCards = [
        { label: "Total Bookings", value: stats?.totalBookings || 0, icon: <FiCalendar />, color: "bg-blue-900/30 text-blue-400" },
        { label: "Total Users", value: stats?.totalUsers || 0, icon: <FiUsers />, color: "bg-purple-900/30 text-purple-400" },
        { label: "Total Revenue", value: `৳${stats?.totalRevenue || 0}`, icon: <FiDollarSign />, color: "bg-green-900/30 text-green-400" },
        { label: "Pending", value: stats?.pendingBookings || 0, icon: <FiClock />, color: "bg-yellow-900/30 text-yellow-400" },
        { label: "Confirmed", value: stats?.confirmedBookings || 0, icon: <FiCheckCircle />, color: "bg-blue-900/30 text-blue-400" },
        { label: "Completed", value: stats?.completedBookings || 0, icon: <FiCheckCircle />, color: "bg-green-900/30 text-green-400" },
        { label: "Cancelled", value: stats?.cancelledBookings || 0, icon: <FiXCircle />, color: "bg-red-900/30 text-red-400" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-extrabold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-1">Welcome back, Admin! Here's what's happening.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                            {card.icon}
                        </div>
                        <p className="text-2xl font-extrabold text-white">{card.value}</p>
                        <p className="text-gray-400 text-sm mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                    <h2 className="font-bold text-white">
                        Recent Bookings
                        <span className="ml-2 text-xs text-gray-400 font-normal">
                            (all users)
                        </span>
                    </h2>
                    <Link href="/dashboard/bookings" className="text-primary text-sm hover:underline">
                        View All →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-left">
                                <th className="px-6 py-3 font-medium">User</th>
                                <th className="px-6 py-3 font-medium">Service</th>
                                <th className="px-6 py-3 font-medium">Location</th>
                                <th className="px-6 py-3 font-medium">Cost</th>
                                <th className="px-6 py-3 font-medium">Payment</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((b) => {
                                const config = statusConfig[b.status] || statusConfig.pending;
                                return (
                                    <tr key={b._id} className="border-b border-gray-800/50 hover:bg-gray-800/50 transition">
                                        <td className="px-6 py-4 text-gray-300 text-xs max-w-[150px] truncate">
                                            {b.userEmail}
                                        </td>
                                        <td className="px-6 py-4 text-white font-medium">{b.serviceName}</td>
                                        <td className="px-6 py-4 text-gray-400">{b.location?.district}</td>
                                        <td className="px-6 py-4 text-primary font-bold">৳{b.totalCost}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.paymentStatus === "paid"
                                                    ? "bg-green-900/30 text-green-400"
                                                    : "bg-gray-800 text-gray-400"
                                                }`}>
                                                {b.paymentStatus === "paid" ? "💳 Paid" : "⏳ Unpaid"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                                                {config.icon} {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {recentBookings.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No bookings yet
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