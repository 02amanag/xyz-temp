import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string
}

export function ThemeWrapper({ defaultTheme, children, className }: ThemeWrapperProps) {
  const [config, setConfig] = useConfig();

  if (!config.menuType) {
    setConfig({ ...config, menuType: "vertical", theme: "blue" })
  }

  //  <div className={cn(`theme-${defaultTheme || config.theme}`, "w-full", className)} style={{ "--radius": `${defaultTheme ? 0.5 : config.radius}rem` } as React.CSSProperties} >
  //   {children}
  // </div>

  return (
    <div className={cn("w-full", className)} >
      {children}
    </div>
  )
}
