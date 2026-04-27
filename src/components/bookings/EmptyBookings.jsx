"use client";
import { useRouter } from "next/navigation";
import { FiPackage } from "react-icons/fi";

export default function EmptyBookings() {
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-sm p-16 text-center">
            <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h2>
            <p className="text-muted mb-6">
                You haven't made any bookings yet. Start by exploring our services.
            </p>
            <button
                onClick={() => router.push("/services")}
                className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-green-700 transition"
            >
                Explore Services →
            </button>
        </div>
    );
}