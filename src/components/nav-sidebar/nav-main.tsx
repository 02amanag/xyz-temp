import { useAtomValue, useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { IMenu } from "@/schema/menu";
import { useEffect, useMemo } from "react";
import { navOpenItemsAtom, sidebarCollapsedAtom } from "@/atoms/nav";
import { useConfig } from "@/hooks/use-config";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Label,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "xyz-comp";

/* -------- Kategori etiketleri (i18n) -------- */
const CAT_ORDER = ["dashboard", "app", "components", "others"] as const;

export function NavMain({ items }: { items: IMenu[] }) {
  const [config] = useConfig();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isCollapsed = useAtomValue(sidebarCollapsedAtom);
  const [openItems, setOpenItems] = useAtom(navOpenItemsAtom);
  const { t } = useTranslation();

  /* ---------------- Aktif‑yol yardımcıları ---------------- */
  const { isPathActive, isParentActive } = useMemo(() => {
    const isPathActive = (path: string) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`);
    const isParentActive = (itm: IMenu) =>
      itm.children?.some((ch) => isPathActive(ch.to));
    return { isPathActive, isParentActive };
  }, [location.pathname]);

  /* ---------------- Mevcut yolu otomatik aç ---------------- */
  useEffect(() => {
    const next = { ...openItems };
    let changed = false;
    items.forEach((itm) => {
      if ((isPathActive(itm.to) || isParentActive(itm)) && !next[itm.title]) {
        next[itm.title] = true;
        changed = true;
      }
    });
    if (changed) setOpenItems(next);
  }, [location.pathname]);

  const handleToggle = (title: string) =>
    setOpenItems((p) => ({ ...p, [title]: !p[title] }));

  /* ---------------- CHILD renderers ---------------- */
  const renderSidebarChildren = (children: IMenu[]) => (
    <SidebarMenuSub className="flex flex-col gap-1 mx-3.5 border-l border-sidebar-border px-2.5 py-0.5">
      {children.map((sub) => (
        <SidebarMenuSubItem key={sub.title}>
          <SidebarMenuSubButton
            asChild
            data-active={isPathActive(sub.to)}
            className="data-[active=true]:text-primary data-[active=true]:border-primary/100 data-[active=true]:border-r-2 data-[active=true]:bg-primary/15 dark:text-white text-gray-500 font-bold rounded-none hover:text-primary"
          >
            <Link to={sub.to} className="flex items-center gap-2 p-5">
              {sub.icon && <sub.icon className="size-4 shrink-0" />}
              <span>{t(sub.title)}</span>
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );

  const renderHoverChildren = (children: IMenu[]) => (
    <ul className="flex flex-col gap-1 p-1">
      {children.map((sub) => (
        <li key={sub.title}>
          <Link
            to={sub.to}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
              isPathActive(sub.to) && "text-primary"
            )}
          >
            {sub.icon && <sub.icon className="size-4 shrink-0 !text-primary" />}
            <span className="truncate">{t(sub.title)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  /* ---------------- Tekil öğe (Sidebar) ---------------- */
  const renderSidebarItem = (item: IMenu) => {
    const hasChildren = !!item.children?.length;
    const selfActive = isPathActive(item.to);
    const parentActive = isParentActive(item);

    const buttonCls = cn(
      "data-[active=true]:text-primary data-[active=true]:border-primary/100 data-[active=true]:border-r-2 data-[active=true]:bg-primary/15 dark:text-white text-gray-500 font-bold !rounded-none hover:text-primary"
    );

    const parentLabel = (
      <SidebarMenuButton
        tooltip={t(item.title)}
        data-active={parentActive}
        className={cn(buttonCls, "cursor-default select-none")}
      >
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:px-0 px-3 w-[99%]">
          {item.icon && <item.icon className="size-4 shrink-0" />}
          <span className="truncate">{t(item.title)}</span>
        </div>
      </SidebarMenuButton>
    );

    const linkLabel = (
      <SidebarMenuButton
        asChild
        tooltip={t(item.title)}
        data-active={selfActive}
        className={buttonCls}
      >
        <Link to={item.to} className="flex items-center gap-2 p-5">
          {item.icon && <item.icon className="size-4 shrink-0" />}
          <span>{t(item.title)}</span>
        </Link>
      </SidebarMenuButton>
    );

    const labelWithHover =
      !isMobile && hasChildren && (isCollapsed || !openItems[item.title]) ? (
        <HoverCard openDelay={120} closeDelay={150}>
          <HoverCardTrigger asChild>{parentLabel}</HoverCardTrigger>
          <HoverCardContent
            side="right"
            align="start"
            sideOffset={8}
            className="z-50 w-56 max-h-64 overflow-y-auto rounded-md border bg-popover shadow-lg data-[state=open]:animate-slide-down"
          >
            {renderHoverChildren(item.children!)}
          </HoverCardContent>
        </HoverCard>
      ) : hasChildren ? (
        parentLabel
      ) : (
        linkLabel
      );

    return (
      <Collapsible
        asChild
        key={item.title}
        open={openItems[item.title]}
        onOpenChange={() => handleToggle(item.title)}
      >
        <SidebarMenuItem className="relative">
          {labelWithHover}
          {hasChildren && (
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
              </SidebarMenuAction>
            </CollapsibleTrigger>
          )}
          {hasChildren && (
            <CollapsibleContent className="data-[state=open]:animate-slide-down">
              {renderSidebarChildren(item.children!)}
            </CollapsibleContent>
          )}
        </SidebarMenuItem>
      </Collapsible>
    );
  };

  /* ---------------- Tekil öğe (Horizontal) ---------------- */
  const renderHorizontalItem = (item: IMenu) => (
    <DropdownMenu key={item.title}>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={t(item.title)}
          data-active={!item.children && isPathActive(item.to)}
          className={cn(
            "data-[active=true]:bg-transparent data-[active=true]:font-bold hover:bg-muted active:bg-transparent",
            item.children?.length && "pointer-events-none"
          )}
        >
          <Link to={item.to}>
            {item.icon && <item.icon className="!text-primary" />}
            <span className={cn(isPathActive(item.to) && "font-bold")}>
              {t(item.title)}
            </span>
          </Link>
        </SidebarMenuButton>
        {item.children?.length && (
          <>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-180">
                <ChevronDown />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-64 overflow-y-auto">
              {item.children.map((sub) => (
                <DropdownMenuItem
                  asChild
                  key={sub.title}
                  className={cn(isPathActive(sub.to) && "font-bold")}
                >
                  <Link to={sub.to}>
                    {sub.icon && <sub.icon className="text-primary" />}
                    <span>{t(sub.title)}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </>
        )}
      </SidebarMenuItem>
    </DropdownMenu>
  );

  /* ---------------- Kategorilere grupla ---------------- */
  const grouped = useMemo(() => {
    const g: Record<(typeof CAT_ORDER)[number], IMenu[]> = {
      dashboard: [],
      app: [],
      components: [],
      others: [],
    };
    items.forEach((i) => {
      const key = (i.category as keyof typeof g) ?? "others";
      g[key].push(i);
    });
    return g;
  }, [items]);

  /* ---------------- Menü içeriği ---------------- */
  const menuType = config.menuType;
  const isVertical = menuType === "vertical";
  const isSlim = menuType === "slim";

  const sidebarContent = () => {
    if (isVertical) {
      return CAT_ORDER.flatMap((cat) =>
        grouped[cat].length
          ? [
              <Label
                key={`lab-${cat}`}
                className="px-2 pt-4 pb-4 font-extrabold text-xs text-primary group-data-[collapsible=icon]:hidden"
              >
                {t(`sidebar.categories.${cat}`)}
              </Label>,
              ...grouped[cat].map((itm) => renderSidebarItem(itm)),
            ]
          : []
      );
    }
    if (isSlim) return items.map((itm) => renderSidebarItem(itm));
    return items.map((itm) => renderHorizontalItem(itm));
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu
          className={cn(!isVertical && !isSlim && !isMobile && "!flex-row")}
        >
          {sidebarContent()}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
