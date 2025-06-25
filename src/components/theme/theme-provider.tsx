//@ts-nocheck
import { sidebarCollapsedAtom } from "@/atoms/nav";
import { useConfig } from "@/hooks/use-config";
import { useAtom } from "jotai";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [config] = useConfig();
  const [, setCollapsed] = useAtom(sidebarCollapsedAtom);

  if (config.menuType === "slim") {
    setCollapsed(true);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    root.classList.remove("light", "dark");

    body.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) body.classList.remove(cls);
    });

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      body.classList.add("theme-" + config.theme);
      // @ts-ignore
      body.style = `--radius: ${config.radius ?? 0.5}rem`;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    // @ts-ignore
    body.classList.add("theme-" + config.theme);
    body.style = `--radius: ${config.radius ?? 0.5}rem`;
  }, [theme, config]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};