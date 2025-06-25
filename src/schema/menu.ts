import { z } from "@/i18n"
import type { LucideIcon } from "lucide-react"

const LucideIconSchema = z.custom<LucideIcon>(
  (data) => typeof data === "function",
  { message: "Invalid Lucide icon" }
)

export const MenuCategorySchema = z.enum(["dashboard", "app", "components"]).optional()

// Forward declaration with lazy
const ChildrenMenuItemSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    title: z.string(),
    label: z.string().optional(),
    icon: LucideIconSchema.optional(),
    to: z.string().url(),
    children: z.array(ChildrenMenuItemSchema).optional()  // recursive
  })
)

export const MenuItemSchema = z.object({
  title: z.string(),
  label: z.string().optional(),
  icon: LucideIconSchema.optional(),
  to: z.string().url(),
  children: z.array(ChildrenMenuItemSchema).optional(),
  openInNewTab: z.boolean().optional(),
  category: MenuCategorySchema,
})

export type IChildrenMenuItem = z.infer<typeof ChildrenMenuItemSchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type IMenu = MenuItem

export const MenuArraySchema = z.array(MenuItemSchema)
