"use client";
import { FiMapPin } from "react-icons/fi";

export default function LocationStep({
    locationData,
    division, setDivision,
    district, setDistrict,
    city, setCity,
    area, setArea,
    address, setAddress,
}) {
    const districts = division
        ? (locationData[division] || []).map(d => d.district)
        : [];

    const cities = district
        ? (locationData[division] || []).find(d => d.district === district)?.cities || []
        : [];

    return (
        <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiMapPin className="text-primary" /> Select Location
            </h2>

            {/* Division */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Division
                </label>
                <select
                    value={division}
                    onChange={e => {
                        setDivision(e.target.value);
                        setDistrict(""); setCity(""); setArea("");
                    }}
                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary dark:bg-[#0F1A12] dark:text-white"
                >
                    <option value="">Select Division</option>
                    {Object.keys(locationData).map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* District */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    District
                </label>
                <select
                    value={district}
                    onChange={e => {
                        setDistrict(e.target.value);
                        setCity(""); setArea("");
                    }}
                    disabled={!division}
                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary disabled:opacity-50 dark:bg-[#0F1A12] dark:text-white"
                >
                    <option value="">Select District</option>
                    {districts.map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* City */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City / Upazila
                </label>
                <select
                    value={city}
                    onChange={e => { setCity(e.target.value); setArea(""); }}
                    disabled={!district}
                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary disabled:opacity-50 dark:bg-[#0F1A12] dark:text-white"
                >
                    <option value="">Select City</option>
                    {cities.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Area */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Area
                </label>
                <input
                    type="text"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    placeholder="e.g. Gulshan-1, Dhanmondi-15, Agrabad"
                    disabled={!city}
                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary disabled:opacity-50 dark:bg-[#0F1A12] dark:text-white"
                />
            </div>

            {/* Full Address */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Address
                </label>
                <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="House no, road, landmark..."
                    rows={3}
                    className="w-full border-2 border-cborder dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary resize-none dark:bg-[#0F1A12] dark:text-white"
                />
            </div>
        </div>
    );
}