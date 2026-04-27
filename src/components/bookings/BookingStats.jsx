"use client";

const statusConfig = {
    pending: { label: "Pending", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/40", icon: "⏳" },
    confirmed: { label: "Confirmed", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/40", icon: "✅" },
    completed: { label: "Completed", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/40", icon: "🎉" },
    cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/40", icon: "❌" },
};

export default function BookingStats({ bookings }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(statusConfig).map(([status, config]) => {
                const count = bookings.filter(b => b.status === status).length;
                return (
                    <div
                        key={status}
                        className="bg-white dark:bg-[#1A2E1E] rounded-2xl p-4 shadow-sm text-center"
                    >
                        <p className="text-2xl font-extrabold text-gray-900">{count}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
                            {config.icon} {config.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}