"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold text-primary">
                    Care<span className="text-accent">.xyz</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                    <Link href="/" className="hover:text-primary transition">Home</Link>
                    <Link href="/services" className="hover:text-primary transition">Services</Link>
                    <Link href="/about" className="hover:text-primary transition">About</Link>
                    {session && (
                        <Link href="/my-bookings" className="hover:text-primary transition">
                            My Bookings
                        </Link>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle></ThemeToggle>
                    {!session ? (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 focus:outline-none"
                            >
                                <img
                                    src={session.user?.image || "/default-avatar.png"}
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full border-2 border-primary object-cover"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    {session.user?.name?.split(" ")[0]}
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-cborder py-2 z-50">
                                    <p className="px-4 py-1 text-xs text-muted truncate">
                                        {session.user?.email}
                                    </p>
                                    <hr className="my-1 border-cborder" />
                                    <Link
                                        href="/my-bookings"
                                        className="block px-4 py-2 text-sm hover:bg-background transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        My Bookings
                                    </Link>
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-cborder px-4 py-4 space-y-3">
                    <Link href="/" className="block text-sm font-medium hover:text-primary" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="/services" className="block text-sm font-medium hover:text-primary" onClick={() => setMenuOpen(false)}>Services</Link>
                    <Link href="/about" className="block text-sm font-medium hover:text-primary" onClick={() => setMenuOpen(false)}>About</Link>
                    {session && (
                        <Link href="/my-bookings" className="block text-sm font-medium hover:text-primary" onClick={() => setMenuOpen(false)}>My Bookings</Link>
                    )}
                    <hr className="border-cborder" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
                        <ThemeToggle />
                    </div>
                    {!session ? (
                        <div className="flex gap-3">
                            <Link href="/login" className="flex-1 text-center px-4 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">Login</Link>
                            <Link href="/register" className="flex-1 text-center px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-green-700 transition">Register</Link>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-sm text-muted">{session.user?.email}</p>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full text-left text-sm text-red-500 hover:underline"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}