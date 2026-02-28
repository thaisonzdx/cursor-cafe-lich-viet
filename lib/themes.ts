export type ThemeKey = "light" | "dark" | "lotus" | "jade";

export interface ThemeDefinition {
  key: ThemeKey;
  label: string;
  icon: string;
}

export const themes: ThemeDefinition[] = [
  { key: "light", label: "Sáng", icon: "Sun" },
  { key: "dark", label: "Tối", icon: "Moon" },
  { key: "lotus", label: "Sen", icon: "Flower2" },
  { key: "jade", label: "Ngọc", icon: "Gem" },
];

const STORAGE_KEY = "lich-viet-theme";

export function getStoredTheme(): ThemeKey {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(STORAGE_KEY) as ThemeKey) || "light";
}

export function setStoredTheme(theme: ThemeKey) {
  localStorage.setItem(STORAGE_KEY, theme);
}
