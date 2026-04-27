"use client";

import Link from "next/link";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaCopyright } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-2xl font-extrabold text-primary">
                        Care<span className="text-accent">.xyz</span>
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                        Trusted care services for children, elderly, and family members.
                        Making caregiving easy, safe, and accessible.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-muted">
                        <li>
                            <Link href="/" className="hover:text-primary transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:text-primary transition">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-primary transition">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/my-bookings" className="hover:text-primary transition">
                                My Bookings
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm text-muted">
                        <li className="flex items-center gap-2 hover:text-primary transition">
                            <FiMail className="text-primary" />
                            mellowm678@gmail.com
                        </li>
                        <li className="flex items-center gap-2 hover:text-primary transition">
                            <FiPhone className="text-primary" />
                            +880 1700 000000
                        </li>
                        <li className="flex items-center gap-2 hover:text-primary transition">
                            <FiMapPin className="text-primary" />
                            Dhaka, Bangladesh
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 text-center py-4 text-xs text-muted flex items-center justify-center gap-1">
                <FaCopyright />
                {new Date().getFullYear()} Care.xyz — All rights reserved.
            </div>
        </footer>
    );
}