import { jsx as _jsx } from "react/jsx-runtime";
//@ts-nocheck
import { sidebarCollapsedAtom } from "../../atoms/nav";
import { useConfig } from "../../hooks/use-config";
import { useAtom } from "jotai";
import { createContext, useContext, useEffect, useState } from "react";
const initialState = {
    theme: "light",
    setTheme: () => null,
};
const ThemeProviderContext = createContext(initialState);
export function ThemeProvider({ children, defaultTheme = "light", storageKey = "vite-ui-theme", ...props }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
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
            if (cls.startsWith("theme-"))
                body.classList.remove(cls);
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
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };
    return (_jsx(ThemeProviderContext.Provider, { ...props, value: value, children: children }));
}
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
