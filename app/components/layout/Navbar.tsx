'use client';
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";

export default function Navbar(){

    const {theme, toggleTheme} = useTheme();

    return (
    <header className="w-full px-4 py-3 shadow-md bg-background text-foreground">
      <nav className="flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/" className="text-xl font-semibold">
          Specscraft Blog
        </Link>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded text-sm border border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
      </nav>
    </header>
    )
}