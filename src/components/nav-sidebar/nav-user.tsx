import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/auth/useAuthContext";;
import { BadgeCheck, ChevronsUpDown, LogOut, } from "lucide-react";

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
    Avatar,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "xyz-comp";

export function NavUser() {
    const { open } = useSidebar();
    const { t } = useTranslation();
    const { isMobile } = useSidebar();
    const { logout, user } = useAuthContext();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {(isMobile || open) ?
                            (
                                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center">
                                    <Avatar className="size-8 rounded-full" src={user?.image} />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.username}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                    <ChevronsUpDown className="size-4" />
                                </SidebarMenuButton>
                            ) :
                            (<Avatar className="size-8 rounded-full" src={user?.image} />)
                        }

                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                                <Avatar className="size-8 rounded-lg" src={user?.image} />

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.username}</span>
                                    <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5" asChild>
                                <Link to="/settings/profile">
                                    <BadgeCheck className="size-4" />
                                    <span>{t("user.settings")}</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5" onSelect={() => logout()}>
                            <LogOut className="size-4" />
                            <span>{t("user.logout")}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}