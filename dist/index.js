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
// Add more exports as needed for other standalone components/hooks
// Note: The following components require complex setup and are not exported:
// - AppSidebar (requires @/schema/menu, @/hooks/use-config, etc.)
// - Layout (requires @/lib/utils, @/hooks/use-config, etc.)
// - ThemeProvider, ThemeCustomizer, ThemeWrapper (require @/lib/utils, etc.)
// - NavMain, NavUser (require @/atoms/nav, @/hooks/use-config, etc.)
// - Page components (require many internal dependencies)
// - Original ThemeSwitcher (requires @/components/theme/theme-provider)
// To use the complex components, run the full xyz-temp project as a standalone app
