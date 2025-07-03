import { type Theme } from "./themes";
interface activeTheme {
    light?: string;
    dark?: string;
}
type Config = {
    theme: Theme["name"];
    radius: number;
    activeTheme?: activeTheme;
    menuType?: ("vertical" | "horizontal" | "slim");
};
export declare function useConfig(): [Config, (args_0: Config | typeof import("jotai/utils").RESET | ((prev: Config) => Config | typeof import("jotai/utils").RESET)) => void];
export {};
//# sourceMappingURL=use-config.d.ts.map