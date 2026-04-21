"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiLoader, FiUser } from "react-icons/fi";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/admin/users")
            .then(res => res.json())
            .then(data => { setUsers(data.users || []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filtered = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (d) => new Date(d).toLocaleDateString("en-BD", {
        day: "numeric", month: "short", year: "numeric"
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <FiLoader className="animate-spin text-primary text-4xl" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-white">Manage Users</h1>
                <p className="text-gray-400 mt-1">All registered users on Care.xyz</p>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
            />

            {/* Stats */}
            <div className="flex gap-4">
                <div className="bg-gray-900 rounded-2xl px-6 py-4 border border-gray-800">
                    <p className="text-2xl font-extrabold text-white">{users.length}</p>
                    <p className="text-gray-400 text-sm">Total Users</p>
                </div>
                <div className="bg-gray-900 rounded-2xl px-6 py-4 border border-gray-800">
                    <p className="text-2xl font-extrabold text-white">
                        {users.filter(u => u.image).length}
                    </p>
                    <p className="text-gray-400 text-sm">Google Users</p>
                </div>
                <div className="bg-gray-900 rounded-2xl px-6 py-4 border border-gray-800">
                    <p className="text-2xl font-extrabold text-white">
                        {users.filter(u => !u.image).length}
                    </p>
                    <p className="text-gray-400 text-sm">Email Users</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-left">
                                <th className="px-6 py-3 font-medium">User</th>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium">Contact</th>
                                <th className="px-6 py-3 font-medium">NID</th>
                                <th className="px-6 py-3 font-medium">Joined</th>
                                <th className="px-6 py-3 font-medium">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(user => (
                                <tr key={user._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {user.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt={user.name}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                                    <FiUser className="text-xs" />
                                                </div>
                                            )}
                                            <span className="text-white font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-400">{user.contact || "—"}</td>
                                    <td className="px-6 py-4 text-gray-400">{user.nid || "—"}</td>
                                    <td className="px-6 py-4 text-gray-400">{formatDate(user.createdAt)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.image
                                                ? "bg-blue-900/30 text-blue-400"
                                                : "bg-purple-900/30 text-purple-400"
                                            }`}>
                                            {user.image ? "Google" : "Email"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}