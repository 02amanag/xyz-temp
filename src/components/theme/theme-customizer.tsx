//import "@/styles/mdx.css";
import React from "react";
import { cn } from "@/lib/utils";
import { themes } from "@/hooks/themes";
import { useTheme } from "./theme-provider";
import { useConfig } from "@/hooks/use-config";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeWrapper } from "@/components/theme/theme-wrapper";
import {
  CheckIcon,
  MoonIcon,
  RefreshCcw,
  Settings,
  SunIcon,
} from "lucide-react";
import {
  Label,
  Button,
  Skeleton,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  useSidebar,
} from "xyz-comp";
import { useAtom } from "jotai";
import { sidebarCollapsedAtom } from "@/atoms/nav";

interface ThemeCustomizerProps {
  className?: string;
}

export function ThemeCustomizer({ className }: ThemeCustomizerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Drawer onOpenChange={() => setOpen(!open)} direction="right">
        <DrawerTrigger asChild className="p-1">
          <div className="group">
            <Settings className={cn("size-6 transition-all group-hover:rotate-180")}/>
          </div>
        </DrawerTrigger>
        <DrawerContent className="p-6 pt-0 rounded-none w-full md:w-[400px]">
          <Customizer />
        </DrawerContent>
      </Drawer>
    </div>
  );
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

  return (
    <ThemeWrapper
      defaultTheme={config.theme ?? "blue"}
      className="flex flex-col space-y-4 md:space-y-6"
    >
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Tema Düzenleyici
          </div>
          <div className="text-xs text-muted-foreground">
            Temanızı dilediğiniz renkte, kenarlık stilinde, Siyah&Beyaz modda ve
            tercih ettiğiniz menü tipine göre özelleştirin.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          title="Sıfırla"
          onClick={() => {
            setConfig({
              ...config,
              theme: "blue",
              radius: 0.5,
              activeTheme: themes.find((val) => val.name === "blue")
                ?.activeColor,
              menuType: "vertical",
            });

            setMode("light");
          }}
        >
          <RefreshCcw />
          <span className="sr-only">Reset</span>
        </Button>
      </div>

      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Renkler</Label>
          <div className="md:grid md:grid-cols-3 flex flex-wrap gap-2">
            {themes.map((theme) => {
              const isActive = config.theme === theme.name;
              return mounted ? (
                <Button
                  variant="ghost"
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: theme.name,
                      activeTheme: theme.activeColor,
                    });
                  }}
                  className={cn(
                    "border justify-start text-xs",
                    isActive && "border-2 border-primary"
                  )}
                  style={
                    {
                      "--theme-primary": `hsl(${
                        theme?.activeColor[mode === "dark" ? "dark" : "light"]
                      })`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
                    )}
                  >
                    {isActive && <CheckIcon className="size-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Kenarlık "Radius"</Label>
          <div className="grid grid-cols-5 gap-2">
            {["0", "0.3", "0.5", "0.75", "1.0"].map((value) => (
              <Button
                variant="outline"
                size="sm"
                key={value}
                onClick={() => {
                  setConfig({
                    ...config,
                    radius: Number.parseFloat(value),
                  });
                }}
                className={cn(
                  config.radius === Number.parseFloat(value) &&
                    "border-2 border-primary"
                )}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Tema Modu</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMode("light")}
                  className={cn(mode === "light" && "border-2 border-primary")}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Beyaz
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMode("dark")}
                  className={cn(mode === "dark" && "border-2 border-primary")}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Siyah
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Menü Tipi</Label>
          <div className="grid grid-cols-5 gap-2">
            {["vertical", "horizontal", "slim"].map((value: any) => (
              <Button
                variant="outline"
                size="sm"
                key={value}
                onClick={() => {
                  setConfig({
                    ...config,
                    menuType: value,
                  });
                  if (value === "slim") {
                    setCollapsed(true);
                  } else {
                    setCollapsed(false);
                  }
                  if (!isMobile) {
                    if (value === "vertical") {
                      if (!open) toggleSidebar();
                    }

                    if (value === "slim") {
                      if (open) toggleSidebar();
                    }
                  }
                }}
                className={cn(
                  config.menuType === value && "border-2 border-primary"
                )}
              >
                {t("theme." + value)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
