import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils"

export const navOpenItemsAtom = atomWithStorage<Record<string, boolean>>("nav-open-items", {})
export const sidebarCollapsedAtom = atom(false);