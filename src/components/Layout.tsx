import { cn } from "@/lib/utils";
import tr from "../assets/tr.svg";
import en from "../assets/us.svg";
import avatar from "../assets/avatars/Eileen.jpg";
import { AppSidebar } from "./AppSidebar";
import { matchPath, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useConfig } from "@/hooks/use-config";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthContext } from "@/auth/useAuthContext";
import { ThemeCustomizer } from "./theme/theme-customizer";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  Label,
  Button,
  Avatar,
  Breadcrumb,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Badge,
  Input,
  Notification,
  NotificationData,
} from "xyz-comp";

import {
  ChartSpline,
  Command,
  Database,
  PenTool,
  FilePenLine,
  FormInput,
  GalleryHorizontal,
  Grid,
  Image,
  LayoutDashboard,
  List,
  ListCollapse,
  MessageCircle,
  QrCode,
  StepForward,
  Table,
  MenuIcon,
  Map,
  ChartScatter,
  ChartLine,
  Lightbulb,
  ShoppingCart,
  PackagePlus,
  SquarePen,
  Logs,
  Search,
  Globe,
  Pen,
  Settings,
  Store,
  MessageCircleQuestion,
  LogOut,
} from "lucide-react";
import { useAtom } from "jotai";
import { sidebarCollapsedAtom } from "@/atoms/nav";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface BreadcrumbItemData {
  label?: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  children?: {
    label?: string;
    href?: string;
    icon?: React.ReactNode;
    active?: boolean;
  }[];
}

const items: BreadcrumbItemData[] = [
  {
    label: "sidebar.dashboard",
    href: "/",
    icon: <LayoutDashboard />,
  },
  {
    label: "sidebar.analytic",
    href: "/analytic",
    icon: <ChartScatter />,
  },
  {
    label: "sidebar.sales",
    href: "/sales",
    icon: <ChartLine />,
  },
  {
    label: "sidebar.project_list",
    href: "/projectlist",
    icon: <Lightbulb />,
  },
  {
    label: "sidebar.product_list",
    href: "/productlist",
    icon: <ShoppingCart />,
  },
  {
    label: "sidebar.add_product",
    href: "/addproduct",
    icon: <PackagePlus />,
  },
  {
    label: "sidebar.edit_product",
    href: "/editproduct/12",
    icon: <SquarePen />,
  },
  {
    label: "sidebar.orders",
    href: "/orders",
    icon: <Logs />,
  },
  {
    label: "sidebar.settings",
    href: "/settings",
    icon: <Settings />,
  },
  {
    label: "sidebar.turkey_map",
    href: "/turkey-map",
    icon: <Map />,
  },
  {
    label: "sidebar.accordion",
    href: "/accordion",
    icon: <ListCollapse />,
  },
  {
    label: "sidebar.barcode",
    href: "/barcode",
    icon: <QrCode />,
  },
  {
    label: "sidebar.button",
    href: "/button",
    icon: <Command />,
  },
  {
    label: "sidebar.carousel",
    href: "/carousel",
    icon: <GalleryHorizontal />,
  },
  {
    label: "sidebar.chart",
    href: "/chart",
    icon: <ChartSpline />,
  },
  {
    label: "sidebar.datatable",
    href: "/datatable",
    icon: <Database />,
    children: [
      {
        label: "sidebar.datatable.basic_usage",
        href: "/datatable/basic",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.server_side",
        href: "/datatable/serverside",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.multiple_selection_pinning",
        href: "/datatable/multipleSelectPinning",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.single_selection",
        href: "/datatable/singleSelectionClick",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.row_reorder",
        href: "/datatable/rowReorder",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.row_expand",
        href: "/datatable/rowExpand",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.row_pinning",
        href: "/datatable/rowPinning",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.column_pinning",
        href: "/datatable/columnPinning",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.column_resize",
        href: "/datatable/columnResize",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.custom_filter_visibility",
        href: "/datatable/customFilterVisibility",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.grouping_aggregation",
        href: "/datatable/groupingAggregation",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.export_print",
        href: "/datatable/exportPrint",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.row_events",
        href: "/datatable/rowEvents",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.loading_no_data",
        href: "/datatable/loadingNoData",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.full_featured",
        href: "/datatable/fullFeatured",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.styling_variants",
        href: "/datatable/stylingVariants",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.custom_loading",
        href: "/datatable/customLoading",
        icon: <Database />,
      },
      {
        label: "sidebar.datatable.row_size",
        href: "/datatable/rowSize",
        icon: <Database />,
      },
    ],
  },
  {
    label: "sidebar.ecommerce",
    href: "/ecommerce",
    icon: <Database />,
    children: [
      {
        label: "sidebar.product_list",
        href: "/ecommerce/productlist",
        icon: <Database />,
      },
      {
        label: "sidebar.add_product",
        href: "/ecommerce/addproduct",
        icon: <Database />,
      },
      {
        label: "sidebar.edit_product",
        href: "/ecommerce/editproduct/:id",
        icon: <Database />,
      },
      {
        label: "sidebar.orders",
        href: "/ecommerce/orders",
        icon: <Database />,
      },
    ],
  },
  {
    label: "sidebar.dialog",
    href: "/dialog",
    icon: <MessageCircle />,
  },
  {
    label: "sidebar.editor",
    href: "/editor",
    icon: <FilePenLine />,
  },
  {
    label: "sidebar.form",
    href: "/form",
    icon: <FormInput />,
  },
  {
    label: "sidebar.gridlist",
    href: "/gridlist",
    icon: <Grid />,
  },
  {
    label: "sidebar.image",
    href: "/image",
    icon: <Image />,
  },
  {
    label: "sidebar.input",
    href: "/input",
    icon: <FormInput />,
  },
  {
    label: "sidebar.list",
    href: "/list",
    icon: <List />,
  },
  {
    label: "sidebar.menu",
    href: "/menu",
    icon: <MenuIcon />,
  },
  {
    label: "sidebar.step",
    href: "/step",
    icon: <StepForward />,
  },
  {
    label: "sidebar.table",
    href: "/table",
    icon: <Table />,
  },
  {
    label: "sidebar.tools",
    href: "/tools",
    icon: <PenTool />,
  },
];

function translateBreadcrumbItems(
  items: BreadcrumbItemData[],
  t: (key: string) => string
): BreadcrumbItemData[] {
  return items.map((item) => ({
    ...item,
    label: item.label ? t(item.label) : "",
    children: item.children
      ? translateBreadcrumbItems(item.children, t)
      : undefined,
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [config] = useConfig();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [, setCollapsed] = useAtom(sidebarCollapsedAtom);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const { logout, user } = useAuthContext();
  const breadcrumbItems =
    findBreadcrumbPath(items as BreadcrumbItemData[], location.pathname) ?? [];

  useEffect(() => {
    document.title = "MF/Admin Template-3";
  }, []);

  const notifications: NotificationData[] = [
    {
      id: "1",
      caption: t("notifications.newMessage.caption"),
      description: t("notifications.newMessage.description"),
      timestamp: "2025-05-14T12:00:00Z",
      isRead: false,
      iconType: "mail",
    },
    {
      id: "2",
      caption: t("notifications.orderUpdate.caption"),
      description: t("notifications.orderUpdate.description"),
      timestamp: "2025-05-13T09:30:00Z",
      isRead: true,
      iconType: "info",
    },
    {
      id: "3",
      caption: t("notifications.reminder.caption"),
      description: t("notifications.reminder.description"),
      timestamp: "2025-05-14T11:00:00Z",
      isRead: false,
      iconType: "alert",
    },
  ];

  const translatedBreadcrumbItems = translateBreadcrumbItems(
    breadcrumbItems,
    t
  );

  function isRouteMatch(pattern: string, pathname: string) {
    // Trailing slash tutarsızlıklarını önlemek için trimle
    const clean = (s: string) =>
      s.endsWith("/") && s.length > 1 ? s.slice(0, -1) : s;

    return !!matchPath({ path: clean(pattern), end: true }, clean(pathname));
  }

  function findBreadcrumbPath(
    items: BreadcrumbItemData[],
    pathname: string,
    parentPath: BreadcrumbItemData[] = []
  ): BreadcrumbItemData[] | null {
    for (const item of items) {
      // Reset
      item.active = false;
      item.children?.forEach((child) => (child.active = false));

      const currentPath = [...parentPath, item];

      /* ---- PARAMETRELİ ROUTE DESTEĞİ ---- */
      if (isRouteMatch(item.href!, pathname)) {
        currentPath.forEach((i) => (i.active = false));
        currentPath[currentPath.length - 1].active = true;

        /* Dinamik breadcrumb link’i gerçek path’e çevirmek isterseniz: */
        item.href = pathname; // isteğe bağlı
        return currentPath;
      }

      if (item.children) {
        const found = findBreadcrumbPath(item.children, pathname, currentPath);
        if (found) return found;
      }
    }
    return null;
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // i18n dili değiştirme
  };

  const isSlim = config.menuType === "slim";

  return (
    <SidebarProvider
      className={cn(
        (isMobile || config.menuType) === "horizontal" ? "!flex-col" : ""
      )}
      defaultOpen={!(isMobile || isSlim)}
    >
      <AppSidebar />

      <SidebarInset className="w-full overflow-hidden">
        <main className="flex flex-col flex-1">
          <div className="flex items-center px-2 sm:px-4 justify-between py-3 border-b">
            <div className="flex gap-2">
              {isMobile ||
              (config.menuType !== "horizontal" &&
                config.menuType !== "slim") ? (
                <SidebarTrigger
                  onClick={() => setCollapsed((v) => !v)}
                  className="dark:text-white text-gray-600"
                />
              ) : (
                <div />
              )}
              <Input
                startIcon={<Search className="text-gray-600 hidden sm:block" />}
                placeholder={t("navbar.search")}
                className="w-[350px] hidden sm:block"
                size={"sm"}
                autoComplete="off"
              />
            </div>
            <div className="flex items-center gap-6">
              {/* <ThemeSwitcher /> */}

              <div className="flex items-center">
                <Notification
                  title={t("notifications.title")}
                  notifications={notifications}
                  maxVisible={5}
                  noNewMessage="Yeni Mesaj Yok Test"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Globe className="md:size-5 dark:text-white text-gray-600 hover:text-primary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1">
                  <DropdownMenuItem
                    onClick={() => changeLanguage("tr")}
                    className="flex items-center justify-between"
                  >
                    Türkçe
                    <img className="w-6 h-6" src={tr} alt="logo" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => changeLanguage("en")}
                    className="flex items-center justify-between"
                  >
                    English
                    <img className="w-6  h-6" src={en} alt="logo" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeCustomizer />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center gap-2">
                    <Avatar
                      src={avatar}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <div className="flex flex-col text-sm">
                      <p className="font-medium dark:text-white text-gray-600">
                        Charlie Howard
                      </p>
                      <p className="dark:text-white text-gray-500">
                        {t("navbar.frontEnd")}
                      </p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 text-gray-600 dark:text-white"
                >
                  <DropdownMenuItem>
                    <Pen /> Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/settings")}>
                    <Settings /> Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Store /> Account Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircleQuestion /> Help Center
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="p-5 space-y-5">
            <Breadcrumb items={translatedBreadcrumbItems  as any} maxVisible={3} />
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
