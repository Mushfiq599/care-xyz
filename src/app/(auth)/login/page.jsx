"use client";
import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginPageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const registered = searchParams.get("registered");

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
            callbackUrl,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid email or password.");
        } else {
            router.push(callbackUrl);
        }
    };

    const handleGoogle = () => {
        signIn("google", { callbackUrl });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-2">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-muted text-sm mb-6">
                    Login to manage your care bookings
                </p>

                {registered && (
                    <p className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4">
                        Registration successful! Please login.
                    </p>
                )}

                {error && (
                    <p className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-cborder rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-cborder" />
                    <span className="px-3 text-muted text-sm">or</span>
                    <hr className="flex-grow border-cborder" />
                </div>

                <button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-3 border border-cborder rounded-lg py-2 hover:bg-gray-50 transition font-medium"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-muted mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <LoginPageInner />
        </Suspense>
    );
}