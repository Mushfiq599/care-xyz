"use client";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaStripe, FaArrowRight } from "react-icons/fa";

export default function BookingSuccess({
    service,
    duration,
    durationType,
    city,
    district,
    division,
    area,
    totalCost,
}) {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="bg-white dark:bg-[#1A2E1E] rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="text-primary text-4xl" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <FiCheckCircle className="text-primary" />
                    Payment Successful!
                </h2>
                <p className="text-muted mb-6">
                    Your booking has been confirmed and payment received.
                </p>
                <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 text-left space-y-3 mb-6">
                    {[
                        {label: "Service", value: (
                                <span className="flex items-center gap-2 justify-end">
                                    {service.icon}
                                    {service.title}
                                </span>
                            ),
                        },
                        { label: "Duration", value: `${duration} ${durationType}` },
                        { label: "Area", value: area },
                        { label: "Location", value: `${city}, ${district}, ${division}` },
                        {label: "Total Paid", value: (
                                <span className="flex items-center gap-1 justify-end">
                                    <TbCurrencyTaka />
                                    {totalCost}
                                </span>
                            ),
                        },
                        {label: "Payment", value: (
                                <span className="flex items-center gap-1 justify-end text-green-600">
                                    <FaStripe />
                                    Paid
                                </span>
                            ),
                        },
                        {label: "Status", value: (
                                <span className="flex items-center gap-1 justify-end text-yellow-500">
                                    <FiClock />
                                    Pending
                                </span>
                            ),
                        },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <span className="text-sm text-muted">{item.label}</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => router.push("/my-bookings")}
                    className="w-full bg-primary text-white font-bold py-3 rounded-2xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                    View My Bookings
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}