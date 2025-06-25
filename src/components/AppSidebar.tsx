import { IMenu } from "@/schema/menu";
import { Link } from "react-router-dom";
import { useConfig } from "@/hooks/use-config";
import { NavUser } from "./nav-sidebar/nav-user";
import { NavMain } from "./nav-sidebar/nav-main";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  Settings,
} from "lucide-react";

export const items: IMenu[] = [
  {
    title: "sidebar.dashboard",
    to: "/",
    icon: LayoutDashboard,
    category: "dashboard",
  },
  {
    title: "sidebar.analytic",
    to: "/analytic",
    icon: ChartScatter,
    category: "dashboard",
  },
  {
    title: "sidebar.sales",
    to: "/sales",
    icon: ChartLine,
    category: "dashboard",
  },

  {
    title: "sidebar.project_list",
    to: "/projectlist",
    icon: Lightbulb,
    category: "app",
  },
  {
    title: "sidebar.ecommerce",
    to: "/ecommerce",
    icon: ShoppingCart,
    category: "app",
    children: [
      {
        title: "sidebar.product_list",
        to: "/ecommerce/productlist",
        icon: ShoppingCart,
      },
      {
        title: "sidebar.add_product",
        to: "/ecommerce/addproduct",
        icon: PackagePlus,
      },
      {
        title: "sidebar.edit_product",
        to: "/ecommerce/editproduct/12",
        icon: SquarePen,
      },
      { title: "sidebar.orders", to: "/ecommerce/orders", icon: Logs },
    ],
  },
  {
    title: "sidebar.settings",
    to: "/settings",
    icon: Settings,
    category: "app",
  },

  {
    title: "sidebar.turkey_map",
    to: "/turkey-map",
    icon: Map,
    category: "components",
  },
  {
    title: "sidebar.accordion",
    to: "/accordion",
    icon: ListCollapse,
    category: "components",
  },
  {
    title: "sidebar.barcode",
    to: "/barcode",
    icon: QrCode,
    category: "components",
  },
  {
    title: "sidebar.button",
    to: "/button",
    icon: Command,
    category: "components",
  },
  {
    title: "sidebar.carousel",
    to: "/carousel",
    icon: GalleryHorizontal,
    category: "components",
  },
  {
    title: "sidebar.chart",
    to: "/chart",
    icon: ChartSpline,
    category: "components",
  },
  {
    title: "sidebar.datatable",
    to: "/datatable",
    icon: Database,
    category: "components",
    children: [
      {
        title: "sidebar.datatable.basic_usage",
        to: "/datatable/basic",
        icon: Database,
      },
      {
        title: "sidebar.datatable.server_side",
        to: "/datatable/serverside",
        icon: Database,
      },
      {
        title: "sidebar.datatable.multiple_selection_pinning",
        to: "/datatable/multipleSelectPinning",
        icon: Database,
      },
      {
        title: "sidebar.datatable.single_selection",
        to: "/datatable/singleSelectOnClick",
        icon: Database,
      },
      {
        title: "sidebar.datatable.row_reorder",
        to: "/datatable/rowReorder",
        icon: Database,
      },
      {
        title: "sidebar.datatable.row_expand",
        to: "/datatable/rowExpand",
        icon: Database,
      },
      {
        title: "sidebar.datatable.row_pinning",
        to: "/datatable/rowPinning",
        icon: Database,
      },
      {
        title: "sidebar.datatable.column_pinning",
        to: "/datatable/columnPinning",
        icon: Database,
      },
      {
        title: "sidebar.datatable.column_resize",
        to: "/datatable/columnResize",
        icon: Database,
      },
      {
        title: "sidebar.datatable.custom_filter_visibility",
        to: "/datatable/customFilterVisibility",
        icon: Database,
      },
      {
        title: "sidebar.datatable.grouping_aggregation",
        to: "/datatable/groupingAggregation",
        icon: Database,
      },
      {
        title: "sidebar.datatable.export_print",
        to: "/datatable/exportPrint",
        icon: Database,
      },
      {
        title: "sidebar.datatable.row_events",
        to: "/datatable/rowEvents",
        icon: Database,
      },
      {
        title: "sidebar.datatable.loading_no_data",
        to: "/datatable/loadingNoData",
        icon: Database,
      },
      {
        title: "sidebar.datatable.full_featured",
        to: "/datatable/fullFeatured",
        icon: Database,
      },
      {
        title: "sidebar.datatable.styling_variants",
        to: "/datatable/stylingVariants",
        icon: Database,
      },
      {
        title: "sidebar.datatable.custom_loading",
        to: "/datatable/customLoading",
        icon: Database,
      },
      {
        title: "sidebar.datatable.row_size",
        to: "/datatable/rowSize",
        icon: Database,
      },
    ],
  },
  { title: "sidebar.dialog", to: "/dialog", icon: MessageCircle },
  {
    title: "sidebar.editor",
    to: "/editor",
    icon: FilePenLine,
    category: "components",
  },
  {
    title: "sidebar.form",
    to: "/form",
    icon: FormInput,
    category: "components",
  },
  {
    title: "sidebar.gridlist",
    to: "/gridlist",
    icon: Grid,
    category: "components",
  },
  { title: "sidebar.image", to: "/image", icon: Image, category: "components" },
  {
    title: "sidebar.input",
    to: "/input",
    icon: FormInput,
    category: "components",
  },
  { title: "sidebar.list", to: "/list", icon: List, category: "components" },
  {
    title: "sidebar.menu",
    to: "/menu",
    icon: MenuIcon,
    category: "components",
  },
  {
    title: "sidebar.step",
    to: "/step",
    icon: StepForward,
    category: "components",
  },
  { title: "sidebar.table", to: "/table", icon: Table, category: "components" },
  {
    title: "sidebar.tools",
    to: "/tools",
    icon: PenTool,
    category: "components",
  },
];

export function AppSidebar() {
  const [config] = useConfig();
  const isMobile = useIsMobile();

  return isMobile ||
    config.menuType === "vertical" ||
    config.menuType === "slim" ? (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Docuart Template
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  ) : (
    <div className="flex flex-row items-center">
      <SidebarContent className="!flex-row items-center">
        <SidebarHeader className="sticky left-0 !bg-background z-10">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="flex-1 shrink-0 text-sm leading-tight">
                    <span className="text-nowrap font-semibold">
                      Docuart Template
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <NavMain items={items} />
      </SidebarContent>
    </div>
  );
}
