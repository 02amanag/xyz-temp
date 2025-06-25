import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { themes, type Theme } from "./themes";

interface activeTheme {
  light?: string
  dark?: string
}

type Config = {
  theme: Theme["name"]
  radius: number
  activeTheme?: activeTheme
  menuType?: ("vertical" | "horizontal" | "slim")
}

const configAtom = atomWithStorage<Config>("config", {
  theme: "blue",
  radius: 0.5,
  activeTheme: themes.find(val => val.name === 'blue')?.activeColor,
  menuType: "vertical"
})

export function useConfig() {
  return useAtom(configAtom)
}