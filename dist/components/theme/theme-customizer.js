import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//import "@/styles/mdx.css";
import React from "react";
import { cn } from "@/lib/utils";
import { themes } from "@/hooks/themes";
import { useTheme } from "./theme-provider";
import { useConfig } from "@/hooks/use-config";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeWrapper } from "@/components/theme/theme-wrapper";
import { CheckIcon, MoonIcon, RefreshCcw, Settings, SunIcon, } from "lucide-react";
import { Label, Button, Skeleton, Drawer, DrawerContent, DrawerTrigger, useSidebar, } from "xyz-comp";
import { useAtom } from "jotai";
import { sidebarCollapsedAtom } from "@/atoms/nav";
export function ThemeCustomizer({ className }) {
    const [open, setOpen] = React.useState(false);
    return (_jsx("div", { className: cn("flex items-center gap-2", className), children: _jsxs(Drawer, { onOpenChange: () => setOpen(!open), direction: "right", children: [_jsx(DrawerTrigger, { asChild: true, className: "p-1", children: _jsx("div", { className: "group", children: _jsx(Settings, { className: cn("size-6 transition-all group-hover:rotate-180") }) }) }), _jsx(DrawerContent, { className: "p-6 pt-0 rounded-none w-full md:w-[400px]", children: _jsx(Customizer, {}) })] }) }));
}
function Customizer() {
    const isMobile = useIsMobile();
    const { t } = useTranslation();
    const [config, setConfig] = useConfig();
    const { toggleSidebar, open } = useSidebar();
    const [mounted, setMounted] = React.useState(false);
    const { setTheme: setMode, theme: mode } = useTheme();
    const [, setCollapsed] = useAtom(sidebarCollapsedAtom);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    return (_jsxs(ThemeWrapper, { defaultTheme: config.theme ?? "blue", className: "flex flex-col space-y-4 md:space-y-6", children: [_jsxs("div", { className: "flex items-start pt-4 md:pt-0", children: [_jsxs("div", { className: "space-y-1 pr-2", children: [_jsx("div", { className: "font-semibold leading-none tracking-tight", children: "Tema D\u00FCzenleyici" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Teman\u0131z\u0131 diledi\u011Finiz renkte, kenarl\u0131k stilinde, Siyah&Beyaz modda ve tercih etti\u011Finiz men\u00FC tipine g\u00F6re \u00F6zelle\u015Ftirin." })] }), _jsxs(Button, { variant: "ghost", size: "icon", className: "ml-auto rounded-[0.5rem]", title: "S\u0131f\u0131rla", onClick: () => {
                            setConfig({
                                ...config,
                                theme: "blue",
                                radius: 0.5,
                                activeTheme: themes.find((val) => val.name === "blue")
                                    ?.activeColor,
                                menuType: "vertical",
                            });
                            setMode("light");
                        }, children: [_jsx(RefreshCcw, {}), _jsx("span", { className: "sr-only", children: "Reset" })] })] }), _jsxs("div", { className: "flex flex-1 flex-col space-y-4 md:space-y-6", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-xs", children: "Renkler" }), _jsx("div", { className: "md:grid md:grid-cols-3 flex flex-wrap gap-2", children: themes.map((theme) => {
                                    const isActive = config.theme === theme.name;
                                    return mounted ? (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
                                            setConfig({
                                                ...config,
                                                theme: theme.name,
                                                activeTheme: theme.activeColor,
                                            });
                                        }, className: cn("border justify-start text-xs", isActive && "border-2 border-primary"), style: {
                                            "--theme-primary": `hsl(${theme?.activeColor[mode === "dark" ? "dark" : "light"]})`,
                                        }, children: [_jsx("span", { className: cn("mr-1 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"), children: isActive && _jsx(CheckIcon, { className: "size-4 text-white" }) }), theme.label] }, theme.name)) : (_jsx(Skeleton, { className: "h-8 w-full" }, theme.name));
                                }) })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-xs", children: "Kenarl\u0131k \"Radius\"" }), _jsx("div", { className: "grid grid-cols-5 gap-2", children: ["0", "0.3", "0.5", "0.75", "1.0"].map((value) => (_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                        setConfig({
                                            ...config,
                                            radius: Number.parseFloat(value),
                                        });
                                    }, className: cn(config.radius === Number.parseFloat(value) &&
                                        "border-2 border-primary"), children: value }, value))) })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-xs", children: "Tema Modu" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: mounted ? (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => setMode("light"), className: cn(mode === "light" && "border-2 border-primary"), children: [_jsx(SunIcon, { className: "mr-1 -translate-x-1" }), "Beyaz"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setMode("dark"), className: cn(mode === "dark" && "border-2 border-primary"), children: [_jsx(MoonIcon, { className: "mr-1 -translate-x-1" }), "Siyah"] })] })) : (_jsxs(_Fragment, { children: [_jsx(Skeleton, { className: "h-8 w-full" }), _jsx(Skeleton, { className: "h-8 w-full" })] })) })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-xs", children: "Men\u00FC Tipi" }), _jsx("div", { className: "grid grid-cols-5 gap-2", children: ["vertical", "horizontal", "slim"].map((value) => (_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                        setConfig({
                                            ...config,
                                            menuType: value,
                                        });
                                        if (value === "slim") {
                                            setCollapsed(true);
                                        }
                                        else {
                                            setCollapsed(false);
                                        }
                                        if (!isMobile) {
                                            if (value === "vertical") {
                                                if (!open)
                                                    toggleSidebar();
                                            }
                                            if (value === "slim") {
                                                if (open)
                                                    toggleSidebar();
                                            }
                                        }
                                    }, className: cn(config.menuType === value && "border-2 border-primary"), children: t("theme." + value) }, value))) })] })] })] }));
}
