"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Safe localStorage access
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  try {
    return (localStorage.getItem("theme") as Theme) || 'light';
  } catch {
    return 'light';
  }
};

const setStoredTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Ignore localStorage errors
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference
    const savedTheme = getStoredTheme();
    
    if (savedTheme) {
      // User has explicitly set a theme preference
      setTheme(savedTheme);
    } else {
      // First visit - check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      // Save the initial theme preference
      setStoredTheme(initialTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    setStoredTheme(theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-950">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  // Provide a safe fallback if context is not available (during SSR)
  if (context === undefined) {
    return {
      theme: "light" as Theme,
      toggleTheme: () => {
        console.warn("ThemeProvider not available");
      }
    };
  }
  
  return context;
} 