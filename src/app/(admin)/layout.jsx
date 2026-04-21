"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
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
    const pathname = usePathname();
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
        // This wrapper sits BELOW the main Navbar naturally
        <div className="flex bg-gray-950 min-h-screen">

            {/* Sidebar — sticky but starts below navbar */}
            <aside className={`
        sticky top-[65px] h-[calc(100vh-65px)] self-start
        w-64 bg-gray-900 border-r border-gray-800
        flex-shrink-0 flex-col
        hidden md:flex
        z-10
      `}>
                {/* Logo */}
                <div className="px-6 py-5 border-b border-gray-800">
                    <Link href="/dashboard" className="text-xl font-extrabold text-white">
                        Care<span className="text-primary">.xyz</span>
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                            Admin
                        </span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="px-3 py-4 space-y-1 flex-1">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${pathname === link.href
                                    ? "bg-primary/20 text-primary"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom user info */}
                <div className="p-4 border-t border-gray-800">
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

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed top-[65px] left-0 bottom-0 w-64 bg-gray-900 border-r border-gray-800 z-50 md:hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
                            <span className="text-xl font-extrabold text-white">
                                Care<span className="text-primary">.xyz</span>
                            </span>
                            <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
                                <FiX />
                            </button>
                        </div>
                        <nav className="px-3 py-4 space-y-1 flex-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${pathname === link.href
                                            ? "bg-primary/20 text-primary"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                                        }`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-gray-800">
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-xl transition text-sm"
                            >
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0">
                {/* Mobile top bar */}
                <div className="md:hidden bg-gray-900 border-b border-gray-800 px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-400 hover:text-white"
                    >
                        <FiMenu className="text-xl" />
                    </button>
                    <span className="font-bold text-white">Admin Dashboard</span>
                </div>

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}