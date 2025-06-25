import type { FC, PropsWithChildren } from "react"
import { ThemeWrapper } from "@/components/theme/theme-wrapper"
import { ThemeProvider } from "@/components/theme/theme-provider"


export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
    <ThemeWrapper>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    </ThemeWrapper>
)