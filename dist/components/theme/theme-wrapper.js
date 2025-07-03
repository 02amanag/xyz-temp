import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
export function ThemeWrapper({ defaultTheme, children, className }) {
    const [config, setConfig] = useConfig();
    if (!config.menuType) {
        setConfig({ ...config, menuType: "vertical", theme: "blue" });
    }
    //  <div className={cn(`theme-${defaultTheme || config.theme}`, "w-full", className)} style={{ "--radius": `${defaultTheme ? 0.5 : config.radius}rem` } as React.CSSProperties} >
    //   {children}
    // </div>
    return (_jsx("div", { className: cn("w-full", className), children: children }));
}
