import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-cborder mt-16">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-extrabold text-primary">
                        Care<span className="text-accent">.xyz</span>
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                        Trusted care services for children, elderly, and family members. Making caregiving easy, safe, and accessible.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-muted">
                        <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
                        <li><Link href="/#services" className="hover:text-primary transition">Services</Link></li>
                        <li><Link href="/#about" className="hover:text-primary transition">About Us</Link></li>
                        <li><Link href="/my-bookings" className="hover:text-primary transition">My Bookings</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm text-muted">
                        <li>📧 support@care.xyz</li>
                        <li>📞 +880 1700 000000</li>
                        <li>📍 Dhaka, Bangladesh</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-cborder text-center py-4 text-xs text-muted">
                © {new Date().getFullYear()} Care.xyz — All rights reserved.
            </div>
        </footer>
    );
}