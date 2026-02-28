"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getStoredTheme,
  setStoredTheme,
  type ThemeKey,
} from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getStoredTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    setStoredTheme(theme);
  }, [theme, mounted]);

  const setTheme = useCallback((t: ThemeKey) => {
    setThemeState(t);
  }, []);

  if (!mounted) {
    return (
      <ThemeContext value={{ theme: "light", setTheme }}>
        {children}
      </ThemeContext>
    );
  }

  return (
    <ThemeContext value={{ theme, setTheme }}>
      {children}
    </ThemeContext>
  );
}
