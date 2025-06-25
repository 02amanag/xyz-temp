import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Guard’lar
import AuthGuard from "@/auth/AuthGuard";
import GuestGuard from "@/auth/GuestGuard";
// Layout (içerisine kendi tasarımınızı koyabilirsiniz)
import Layout from "@/components/Layout";

// Sayfa bileşenleri:
import AccordionPage from "@/pages/AccordionPage";
import ButtonPage from "@/pages/ButtonPage";
import DialogPage from "@/pages/DialogPage";
import CarouselPage from "@/pages/CarouselPage";
import ChartPage from "@/pages/ChartPage";
import InputPage from "@/pages/InputPage";
import TablePage from "@/pages/TablePage";
import ImagePage from "@/pages/ImagePage";
import BarcodePage from "@/pages/BarcodePage";
import EditorPage from "@/pages/EditorPage";
import StepPage from "@/pages/StepPage";
import FormPage from "@/pages/FormPage";

import ListPage from "@/pages/ListPage";
import GridListPage from "@/pages/GridListPage";
import LoginPage from "@/pages/auth/LoginPage";
import BasicUsageDataTableDemo from "@/pages/DataTableDemo/BasicUsageDataTableDemo";
import ServerSideDataTableDemo from "@/pages/DataTableDemo/ServerSideDataTableDemo";
import MultipleSelectPinningDataTableDemo from "@/pages/DataTableDemo/MultipleSelectPinningDataTableDemo";
import SingleSelectOnClickDataTableDemo from "@/pages/DataTableDemo/SingleSelectOnClickDataTableDemo";
import RowReorderDataTableDemo from "@/pages/DataTableDemo/RowReorderDataTableDemo";
import RowExpandDataTableDemo from "@/pages/DataTableDemo/RowExpandDataTableDemo";
import RowPinningDataTableDemo from "@/pages/DataTableDemo/RowPinningDataTableDemo";
import CustomFilterVisibilityDataTableDemo from "@/pages/DataTableDemo/CustomFilterVisibilityDataTableDemo";
import GroupingAggregationDataTableDemo from "@/pages/DataTableDemo/GroupingAggregationDataTableDemo";
import ExportPrintDataTableDemo from "@/pages/DataTableDemo/ExportPrintDataTableDemo";
import RowEventsDataTableDemo from "@/pages/DataTableDemo/RowEventsDataTableDemo";
import LoadingNoDataDataTableDemo from "@/pages/DataTableDemo/LoadingNoDataDataTableDemo";
import FullFeaturedDataTableDemo from "@/pages/DataTableDemo/FullFeaturedDataTableDemo";
import CustomLoadingDataTableDemo from "@/pages/DataTableDemo/CustomLoadingDataTableDemo";
import StylingVariantsDataTableDemo from "@/pages/DataTableDemo/StylingVariantsDataTableDemo";
import RowSizeDataTableDemo from "@/pages/DataTableDemo/RowSizeDatatTableDemo";
import ColumnPinningDataTableDemo from "@/pages/DataTableDemo/ColumnPinningDataTableDemo";
import ColumnResizeDataTableDemo from "@/pages/DataTableDemo/ColumnResizeDataTableDemo";
import Dashboard from "@/pages/Dashboard";
import Analytic from "@/pages/Analytic";
import Sales from "@/pages/Sales";
import ProjectList from "@/pages/ProjectList";
import ProductList from "@/pages/ProductList";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";
import Orders from "@/pages/Orders";
import MenuPage from "@/pages/MenuPage";
import ToolsPage from "@/pages/ToolsPage";
import TurkeyMapPage from "@/pages/TurkeyMapPage";
import Settings from "@/pages/Settings";
import NotFoundPage from "@/pages/NotFoundPage";

export interface RouteItem {
  path?: string;
  element?: ReactNode;
  exact?: boolean;
  children?: RouteItem[];
  index?: boolean;
}

const routes: RouteItem[] = [
  // Giriş sayfası -> GuestGuard ile korumalı
  {
    path: "/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },

  // Tüm uygulama sayfaları -> AuthGuard ile korumalı / altına toplanıyor
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout>
          <Outlet />
        </Layout>
      </AuthGuard>
    ),
    children: [
      // Normal sayfalar
      { path: "/", element: <Dashboard />, index: true },
      { path: "analytic", element: <Analytic /> },
      { path: "sales", element: <Sales /> },
      { path: "projectlist", element: <ProjectList /> },
      {
        path: "ecommerce",
        children: [
          { index: true, element: <Navigate to="productlist" /> },
          { path: "productlist", element: <ProductList /> },
          { path: "addproduct", element: <AddProduct /> },
          { path: "editproduct/:id", element: <EditProduct /> },
          { path: "orders", element: <Orders /> },
        ],
      },
      { path: "settings", element: <Settings /> },
      { path: "accordion", element: <AccordionPage /> },
      { path: "barcode", element: <BarcodePage /> },
      { path: "button", element: <ButtonPage /> },
      { path: "carousel", element: <CarouselPage /> },
      { path: "chart", element: <ChartPage /> },
      { path: "dialog", element: <DialogPage /> },
      { path: "editor", element: <EditorPage /> },
      { path: "form", element: <FormPage /> },
      { path: "gridlist", element: <GridListPage /> },
      { path: "image", element: <ImagePage /> },
      { path: "input", element: <InputPage /> },
      { path: "list", element: <ListPage /> },
      { path: "step", element: <StepPage /> },
      { path: "table", element: <TablePage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "tools", element: <ToolsPage /> },
      { path: "turkey-map", element: <TurkeyMapPage /> },

      // DataTable demoları
      {
        path: "datatable",
        children: [
          { index: true, element: <Navigate to="basic" /> }, // tamam
          { path: "basic", element: <BasicUsageDataTableDemo /> }, // tamam
          { path: "serverside", element: <ServerSideDataTableDemo /> }, // tamam
          {
            path: "multipleSelectPinning",
            element: <MultipleSelectPinningDataTableDemo />,
          }, // tamam
          {
            path: "singleSelectOnClick",
            element: <SingleSelectOnClickDataTableDemo />,
          }, // tamam
          { path: "rowReorder", element: <RowReorderDataTableDemo /> }, // tamam
          { path: "rowExpand", element: <RowExpandDataTableDemo /> }, // tamam
          { path: "rowPinning", element: <RowPinningDataTableDemo /> }, // tamam
          {
            path: "customFilterVisibility",
            element: <CustomFilterVisibilityDataTableDemo />,
          }, // tamam
          {
            path: "groupingAggregation",
            element: <GroupingAggregationDataTableDemo />,
          }, // tamam
          { path: "exportPrint", element: <ExportPrintDataTableDemo /> }, // tamam
          { path: "rowEvents", element: <RowEventsDataTableDemo /> }, // tamam
          { path: "loadingNoData", element: <LoadingNoDataDataTableDemo /> }, // tamam
          { path: "fullFeatured", element: <FullFeaturedDataTableDemo /> }, // tamam
          {
            path: "stylingVariants",
            element: <StylingVariantsDataTableDemo />,
          }, // tamam
          { path: "customLoading", element: <CustomLoadingDataTableDemo /> }, // tamam
          { path: "rowSize", element: <RowSizeDataTableDemo /> }, // tamam
          { path: "columnPinning", element: <ColumnPinningDataTableDemo /> }, // tamam
          { path: "columnResize", element: <ColumnResizeDataTableDemo /> }, // tamam
        ],
      },
    ],
  },

   { path: "/not-found", element: <NotFoundPage /> },

  // Eşleşmeyen tüm rotalar -> /'e yönlendir
  { path: "*", element: <Navigate to="/not-found" replace /> },
];

export default routes;
