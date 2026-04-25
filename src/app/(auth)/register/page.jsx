"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RegisterPageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [formData, setFormData] = useState({
        nid: "",
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (formData.password.length < 6)
            return "Password must be at least 6 characters.";
        if (!/[A-Z]/.test(formData.password))
            return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(formData.password))
            return "Password must contain at least one lowercase letter.";
        if (formData.password !== formData.confirmPassword)
            return "Passwords do not match.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const validationError = validate();
        if (validationError) return setError(validationError);

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) return setError(data.message || "Registration failed.");

            // Redirect to login with callbackUrl preserved
            router.push(`/login?registered=true&callbackUrl=${encodeURIComponent(callbackUrl)}`);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="bg-white dark:bg-[#1A2E1E] p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-2">
                    Create an Account
                </h2>
                <p className="text-center text-muted text-sm mb-6">
                    Join Care.xyz and book trusted care services
                </p>

                {error && (
                    <p className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="nid"
                        placeholder="NID Number"
                        value={formData.nid}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#0F1A12] dark:text-white"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#0F1A12] dark:text-white"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#0F1A12] dark:text-white"
                    />
                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#0F1A12] dark:text-white"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#0F1A12] dark:text-white"
                    />
                    <p className="text-xs text-muted -mt-2">
                        Min 6 chars, 1 uppercase, 1 lowercase
                    </p>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#0F1A12] dark:text-white"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <RegisterPageInner />
        </Suspense>
    );
}