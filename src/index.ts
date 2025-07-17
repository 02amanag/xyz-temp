// Export standalone components from the micro-frontend-template
// These components can be used as a library without complex dependencies

// UI Components (standalone)
export { default as TurkeyProvincesMap } from "./components/ui/TurkeyProvincesMap";
export { default as WorldMap } from "./components/ui/WorldMap";

// Standalone Theme Components
export { ThemeSwitcher } from "./components/theme/theme-switcher";
export { ThemeProvider, useTheme } from "./components/theme/theme-provider";

// Hooks (standalone)
export { useIsMobile } from "./hooks/use-mobile";
export { useMediaQuery } from "./hooks/use-media-query";
