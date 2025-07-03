declare const breakpoints: {
    readonly '2xl': 1536;
    readonly xl: 1280;
    readonly lg: 1024;
    readonly md: 768;
    readonly sm: 640;
    readonly xs: 0;
};
type Breakpoint = keyof typeof breakpoints;
export declare function useBreakpoint(): Breakpoint;
export declare function isBreakpointAtOrAbove(current: Breakpoint, target: Breakpoint): boolean;
export declare function isBreakpointBelow(current: Breakpoint, target: Breakpoint): boolean;
export {};
//# sourceMappingURL=useBreakpoint.d.ts.map