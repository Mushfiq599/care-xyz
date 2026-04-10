"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none"
            style={{
                backgroundColor: theme === "dark" ? "#4ADE80" : "#E7E5E0",
            }}
            aria-label="Toggle dark mode"
        >
            <span
                className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300"
                style={{
                    transform: theme === "dark" ? "translateX(28px)" : "translateX(0)",
                }}
            >
                {theme === "dark" ? (
                    <FiMoon className="text-gray-700 text-xs" />
                ) : (
                    <FiSun className="text-yellow-500 text-xs" />
                )}
            </span>
        </button>
    );
}