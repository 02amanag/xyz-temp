import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { themes } from "./themes";
const configAtom = atomWithStorage("config", {
    theme: "blue",
    radius: 0.5,
    activeTheme: themes.find(val => val.name === 'blue')?.activeColor,
    menuType: "vertical"
});
export function useConfig() {
    return useAtom(configAtom);
}
