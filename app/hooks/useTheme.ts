'use client';

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme(){

    const [theme, setTheme] = useState<Theme>("system");

    useEffect(()=>{
        const stored = localStorage.getItem("theme") as Theme || null;

        if(stored == "dark" || stored == "light"){
            setTheme(stored);
            document.documentElement.classList.toggle('dark', stored === "dark");
        }else{
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle('dark',prefersDark);
            setTheme("system");
        }
    },[])

    const toggleTheme = ()=>{
        const isDark = document.documentElement.classList.contains("dark");
        const newTheme = isDark ? "light" : "dark";

        document.documentElement.classList.toggle("dark", newTheme == "dark");
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    }

    return { theme, toggleTheme}
}