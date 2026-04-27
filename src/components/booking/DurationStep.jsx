"use client";
import { FiClock } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

export default function DurationStep({ duration, setDuration, durationType, setDurationType, totalCost, serviceCharge }) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiClock className="text-primary" /> Select Duration
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Duration Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {["hours", "days"].map(type => (
                        <button
                            key={type}
                            onClick={() => { setDurationType(type); setDuration(1); }}
                            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold border-2 transition capitalize text-sm ${durationType === type
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-200 text-gray-500 hover:border-primary dark:border-gray-600 dark:text-gray-400"
                                }`}>
                            {type === "hours" ? <FiClock /> : <FaCalendarAlt />}
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How many {durationType}?
                </label>
                <input
                    type="number"
                    min={1}
                    max={durationType === "hours" ? 24 : 30}
                    value={duration}
                    onChange={e => setDuration(Math.max(1, Number(e.target.value)))}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-xl font-bold focus:outline-none focus:border-primary dark:bg-[#0F1A12] dark:text-white text-center"/>
                <p className="text-xs text-muted mt-1 text-center">
                    Max: {durationType === "hours" ? "24 hours" : "30 days"}
                </p>
            </div>

            <div className="bg-background dark:bg-[#0F1A12] rounded-2xl p-5 flex items-center justify-between border border-gray-200 dark:border-gray-700">
                <div>
                    <p className="text-xs text-muted uppercase tracking-wide mb-1">Estimated Total</p>
                    <p className="flex items-center gap-1 text-4xl font-extrabold text-primary">
                        <TbCurrencyTaka size={34} />
                        {totalCost}
                    </p>
                </div>
                <div className="text-right text-sm text-muted">
                    <p className="font-medium">{duration} {durationType}</p>
                    <p className="flex">×<TbCurrencyTaka size={18} /> {serviceCharge}/hr</p>
                    {durationType === "days" && <p className="text-xs">× 8 hrs/day</p>}
                </div>
            </div>
        </div>
    );
}