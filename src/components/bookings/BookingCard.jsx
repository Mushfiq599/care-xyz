"use client";
import { useRouter } from "next/navigation";
import { FiClock, FiMapPin, FiCalendar, FiDollarSign, FiXCircle, FiLoader } from "react-icons/fi";

const statusConfig = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400", icon: "⏳" },
    confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", icon: "✅" },
    completed: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: "🎉" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: "❌" },
};

const serviceIcons = {
    "baby-care": "👶",
    "elderly-care": "🧓",
    "sick-care": "🏥",
};

export default function BookingCard({ booking, onCancel, cancellingId }) {
    const router = useRouter();
    const config = statusConfig[booking.status] || statusConfig.pending;
    const icon = serviceIcons[booking.serviceId] || "🏠";

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-BD", {
            day: "numeric", month: "short", year: "numeric",
        });

    return (
        <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-sm hover:shadow-md transition p-6">
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
                            onClick={() => onCancel(booking._id)}
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
                    📍 {booking.location?.address}, {booking.location?.area},{" "}
                    {booking.location?.city}, {booking.location?.district},{" "}
                    {booking.location?.division}
                </p>
            </div>
        </div>
    );
}