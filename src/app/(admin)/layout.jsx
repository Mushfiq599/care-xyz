"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    FiGrid, FiUsers, FiCalendar,
    FiLogOut, FiMenu, FiX
} from "react-icons/fi";

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (
            status === "authenticated" &&
            session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
        ) {
            router.push("/");
        }
    }, [status, session]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const navLinks = [
        { href: "/dashboard", label: "Overview", icon: <FiGrid /> },
        { href: "/dashboard/bookings", label: "Bookings", icon: <FiCalendar /> },
        { href: "/dashboard/users", label: "Users", icon: <FiUsers /> },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:static md:block`}>

                {/* Logo */}
                <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
                    <Link href="/dashboard" className="text-xl font-extrabold">
                        Care<span className="text-primary">.xyz</span>
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                            Admin
                        </span>
                    </Link>
                    <button
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiX />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="px-3 py-4 space-y-1">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition text-sm font-medium"
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            A
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white">Admin</p>
                            <p className="text-xs text-gray-500 truncate max-w-[140px]">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-xl transition text-sm"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 flex items-center gap-4 md:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-400 hover:text-white"
                    >
                        <FiMenu className="text-xl" />
                    </button>
                    <span className="font-bold text-white">Admin Dashboard</span>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}