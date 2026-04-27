"use client";

import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";

const statusConfig = {
    pending: {
        label: "Pending",
        color: "text-yellow-600",
        bg: "bg-yellow-100 dark:bg-yellow-900/40",
        icon: <MdOutlinePendingActions />,
    },
    confirmed: {
        label: "Confirmed",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/40",
        icon: <FiCheckCircle />,
    },
    completed: {
        label: "Completed",
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/40",
        icon: <GiPartyPopper />,
    },
    cancelled: {
        label: "Cancelled",
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-900/40",
        icon: <FiXCircle />,
    },
};

export default function BookingStats({ bookings }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(statusConfig).map(([status, config]) => {
                const count = bookings.filter((b) => b.status === status).length;

                return (
                    <div
                        key={status}
                        className="bg-white dark:bg-[#1A2E1E] rounded-2xl p-4 shadow-sm text-center hover:shadow-md transition">
                        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                            {count}
                        </p>

                        <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
                            {config.icon}
                            {config.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}