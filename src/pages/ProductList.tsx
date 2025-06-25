import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
  DataTable,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  Card,
  Input,
  DropdownMenuItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  Tabs,
  TabsList,
  CardHeader,
  CardTitle,
  CardContent,
  Textarea,
  FileUpload,
  CardDescription,
  Label,
  InputGroup,
  Picker,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DropdownMenuSeparator,
  TabItem,
} from "xyz-comp";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  EllipsisVertical,
  Eye,
  Plus,
  Search,
  Trash,
  X,
} from "lucide-react";
import type { RootState } from "@/redux/store";
import { deleteProduct } from "@/redux/slices/productSlice";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { isBreakpointAtOrAbove, useBreakpoint } from "@/hooks/useBreakpoint";

interface Product {
  id: string;
  nameKey: string;
  image: string;
  category: string;
  price: string;
  stock: number;
  status: string;
}

function ProductTable() {
  const dispatch = useDispatch();
  const productData = useSelector((state: RootState) => state.products.list);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedDialogTab, setSelectedDialogTab] = useState<any>("general");
  const [selectedDrawerTab, setSelectedDrawerTab] = useState<any>("general");
  const isMobile = useIsMobile();
  const breakpoint = useBreakpoint();
  const { t } = useTranslation();
  const [files, setFiles] = useState<any[]>([]);

  const [comparePrice, setComparePrice] = useState("$ ");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [costPerItem, setCostPerItem] = useState("$ ");
  const [taxRate, setTaxRate] = useState("$ ");
  const [isWidthMenuOpen, setIsWidthMenuOpen] = useState(false);
  const [widthUnits, setWidthUnits] = useState<"cm" | "mm" | "m">("cm");
  const [isHeightMenuOpen, setIsHeightMenuOpen] = useState(false);
  const [heightUnits, setHeightUnits] = useState<"cm" | "mm" | "m">("cm");
  const [isWeightMenuOpen, setIsWeightMenuOpen] = useState(false);
  const [weightUnits, setWeightUnits] = useState<"kg" | "g" | "mg">("kg");
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!drawerProduct) return;

    setName(t(`productNames.${drawerProduct.nameKey}`));
    setImage(drawerProduct.image);
    setPrice(drawerProduct.price);
  }, [drawerProduct]);

  const productColumns: ColumnDef<Product>[] = [
    {
      header: t("productList.headers.id"),
      accessorKey: "id",
      size: 40,
    },
    {
      id: "product",
      header: t("productList.headers.product"),
      cell: ({ row }) => {
        const { nameKey, image } = row.original;
        return (
          <div className="flex items-center gap-2">
            <img
              src={image}
              alt={t(`productNames.${nameKey}`)}
              className="md:size-16 size-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">
              {t(`productNames.${nameKey}`)}
            </span>
          </div>
        );
      },
    },
    {
      header: t("productList.headers.category"),
      accessorKey: "category",
      cell: ({ getValue }) => (
        <span>{t(`productList.categories.${getValue<string>()}`)}</span>
      ),
    },
    {
      header: t("productList.headers.price"),
      accessorKey: "price",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      header: t("productList.headers.stock"),
      accessorKey: "stock",
      cell: ({ getValue }) => <span>{getValue<number>()}</span>,
    },
    {
      header: t("productList.headers.status"),
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        let dotColor = "bg-gray-500";
        if (status === "inStock") dotColor = "bg-green-500";
        else if (status === "outOfStock") dotColor = "bg-red-500";
        else if (status === "limitedStock") dotColor = "bg-yellow-500";

        return (
          <p className="flex items-center text-sm gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
            {t(`productList.statuses.${status}`)}
          </p>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setOpenDrawer(true);
                setDrawerProduct(row.original);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              {t("productList.actions.viewDetails")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => dispatch(deleteProduct(row.original.id))}
            >
              <Trash className="w-4 h-4 mr-2" />
              {t("productList.actions.deleteProduct")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const paddedProductColumns = productColumns.map((col) => ({
    ...col,
    cell:
      col.cell ??
      (({ getValue }) => (
        <div className="p-3">{getValue<string | number>()}</div>
      )),
  }));

  const categoryOptions = [
    { key: "all", label: t("productList.categories.all") },
    { key: "cloths", label: t("productList.categories.cloths") },
    { key: "bags", label: t("productList.categories.bags") },
    { key: "shoes", label: t("productList.categories.shoes") },
    { key: "watches", label: t("productList.categories.watches") },
    { key: "devices", label: t("productList.categories.devices") },
  ];

  const tagOptions = [
    { key: "cotton", label: t("addProductPage.tags.cotton") },
    { key: "nike", label: t("addProductPage.tags.nike") },
    { key: "sales", label: t("addProductPage.tags.sales") },
    { key: "sports", label: t("addProductPage.tags.sports") },
    { key: "outdoor", label: t("addProductPage.tags.outdoor") },
    { key: "toys", label: t("addProductPage.tags.toys") },
    { key: "hobbies", label: t("addProductPage.tags.hobbies") },
  ];

  const progressTexts = {
    error: t("progress.error"),
    complete: t("progress.complete"),
    loading: t("progress.loading"),
  };

  const filteredData = useMemo(() => {
    return productData.filter((p) => {
      const matchSearch = p.nameKey
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [productData, search, categoryFilter]);

  const [variants, setVariants] = useState<number[]>([]);

  const addVariant = () => {
    setVariants((prev) => [...prev, Date.now()]);
  };

  const removeVariant = (id: number) => {
    setVariants((prev) => prev.filter((v) => v !== id));
  };

  const tabsList: TabItem[] = [
    {
      name: t("addProductPage.tabs.general"),
      value: "general",
      content: "",
      icon: null,
      iconPlacement: "left",
    },
    {
      name: t("addProductPage.tabs.variation"),
      value: "variation",
      content: "",
      icon: null,
      iconPlacement: "left",
    },
    {
      name: t("addProductPage.tabs.shipping"),
      value: "shipping",
      content: "",
      icon: null,
      iconPlacement: "left",
    },
  ];

  return (
    <div className="space-y-6">
      <Drawer
        open={openDrawer}
        onOpenChange={() => setOpenDrawer(!openDrawer)}
        direction="right"
        size="lg"
        showScroll={true}
        customWidth={
          isBreakpointAtOrAbove(breakpoint, "xl") ? "1000px" : "100%"
        }
      >
        <DrawerTrigger />
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>{t("addProductPage.title")}</DrawerTitle>
            <DrawerDescription>
              {t("addProductPage.description")}
            </DrawerDescription>
          </DrawerHeader>

          <Tabs
            defaultValue={selectedDrawerTab}
            onValueChange={setSelectedDrawerTab}
            value={selectedDrawerTab}
            className="w-full flex"
          >
            <TabsList
              variant="underlined"
              layout="horizontal"
              tabsList={tabsList}
              onValueChange={setSelectedDrawerTab}
              value={selectedDrawerTab}
            />
          </Tabs>

          <div className="mt-4">
            {selectedDrawerTab === "general" && (
              <div className="grid grid-cols-6 gap-4">
                <div className="md:col-span-3 col-span-6 flex flex-col gap-4">
                  <Card>
                    <CardHeader className="!py-2">
                      <CardTitle className="text-lg font-medium">
                        {t("addProductPage.basicInfo")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Input
                        label={t("addProductPage.productName")}
                        required
                        placeholder={t("addProductPage.productNamePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Textarea
                        label={t("addProductPage.description")}
                        className="!h-[200px]"
                      />
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-3 col-span-6 row-start-4">
                    <CardHeader className="!py-2">
                      <CardTitle className="text-lg font-medium">
                        {t("addProductPage.pricing")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-6">
                      <Input
                        type="text"
                        label={t("addProductPage.price")}
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        inputMode="decimal"
                      />
                      <Input
                        type="text"
                        label={t("addProductPage.comparePrice")}
                        required
                        value={comparePrice}
                        onChange={(e) => setComparePrice(e.target.value)}
                        inputMode="decimal"
                      />
                      <Input
                        type="text"
                        label={t("addProductPage.costPerItem")}
                        required
                        value={costPerItem}
                        onChange={(e) => setCostPerItem(e.target.value)}
                        inputMode="decimal"
                      />
                      <Input
                        type="text"
                        label={t("addProductPage.taxRate")}
                        required
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        inputMode="decimal"
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-3 col-span-6 flex flex-col gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">
                        {t("addProductPage.fileUpload.productImage")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex items-center justify-center">
                      <div className="rounded border-dashed border-[1px] m-2 transition-colors duration-500 ease-in-out hover:border-primary p-3">
                        <Image
                          src={image || ""}
                          alt={name ?? t("addProductPage.productName")}
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-2 row-span-2 col-start-5 row-start-3">
                    <CardHeader className="!py-2">
                      <CardTitle className="text-lg font-medium">
                        {t("addProductPage.organization")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <h3 className="text-sm font-medium">
                        {t("addProductPage.category")}
                      </h3>
                      <Picker
                        items={categoryOptions}
                        onValueChange={(v) => console.log("Category:", v)}
                        placeholder={t(
                          "addProductPage.picker.placeholderSelectAnItems"
                        )}
                        more={t("addProductPage.picker.more")}
                        searchPlaceholder={t(
                          "addProductPage.picker.searchPlaceholder"
                        )}
                        selectAll={t("addProductPage.picker.selectAll")}
                        noResultsFound={t(
                          "addProductPage.picker.noResultsFound"
                        )}
                        noAvailableItems={t(
                          "addProductPage.picker.noAvailableItems"
                        )}
                        className="!w-full"
                      />

                      <h3 className="text-sm font-medium">
                        {t("addProductPage.tag")}
                      </h3>
                      <Picker
                        items={tagOptions}
                        multiple
                        onValueChange={(v) => console.log("Tags:", v)}
                        placeholder={t(
                          "addProductPage.picker.placeholderSelectAnItems"
                        )}
                        more={t("addProductPage.picker.more")}
                        searchPlaceholder={t(
                          "addProductPage.picker.searchPlaceholder"
                        )}
                        selectAll={t("addProductPage.picker.selectAll")}
                        noResultsFound={t(
                          "addProductPage.picker.noResultsFound"
                        )}
                        noAvailableItems={t(
                          "addProductPage.picker.noAvailableItems"
                        )}
                        className="!w-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedDrawerTab === "variation" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium mb-2">
                      {t("addProductPage.variants")}
                    </CardTitle>
                    <CardDescription>
                      {t("addProductPage.variantsDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {variants.map((id) => (
                      <div
                        key={id}
                        className="flex items-center gap-4 border-b-2 p-2"
                      >
                        <Input label={t("addProductPage.variant")} />
                        <Input
                          label={t("addProductPage.price")}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <Input label={t("addProductPage.stockKeepingUnit")} />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeVariant(id)}
                          className="text-destructive mt-5 mr-24"
                        >
                          <X />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addVariant}
                      className="w-full"
                    >
                      <Plus /> {t("addProductPage.addField")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedDrawerTab === "shipping" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium mb-2">
                    {t("addProductPage.shipping")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label>{t("addProductPage.width")}</Label>
                    <InputGroup>
                      <Input externalClassname="w-full" />
                      <Button
                        onClick={() => setIsWidthMenuOpen(true)}
                        variant="outline"
                      >
                        {widthUnits} <ChevronDown className="ml-2" />
                      </Button>
                      <DropdownMenu
                        open={isWidthMenuOpen}
                        onOpenChange={() =>
                          setIsWidthMenuOpen(!isWidthMenuOpen)
                        }
                      >
                        <DropdownMenuTrigger />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => setWidthUnits("cm")}
                          >
                            cm
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setWidthUnits("m")}>
                            m
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setWidthUnits("mm")}
                          >
                            mm
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </InputGroup>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>{t("addProductPage.height")}</Label>
                    <InputGroup>
                      <Input externalClassname="w-full" />
                      <Button
                        onClick={() => setIsHeightMenuOpen(true)}
                        variant="outline"
                      >
                        {heightUnits} <ChevronDown className="ml-2" />
                      </Button>
                      <DropdownMenu
                        open={isHeightMenuOpen}
                        onOpenChange={() =>
                          setIsHeightMenuOpen(!isHeightMenuOpen)
                        }
                      >
                        <DropdownMenuTrigger />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => setHeightUnits("cm")}
                          >
                            cm
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setHeightUnits("mm")}
                          >
                            mm
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setHeightUnits("m")}
                          >
                            m
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </InputGroup>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>{t("addProductPage.weight")}</Label>
                    <InputGroup>
                      <Input externalClassname="w-full" />
                      <Button
                        onClick={() => setIsWeightMenuOpen(true)}
                        variant="outline"
                      >
                        {weightUnits} <ChevronDown className="ml-2" />
                      </Button>
                      <DropdownMenu
                        open={isWeightMenuOpen}
                        onOpenChange={() =>
                          setIsWeightMenuOpen(!isWeightMenuOpen)
                        }
                      >
                        <DropdownMenuTrigger />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => setWeightUnits("kg")}
                          >
                            kg
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setWeightUnits("g")}
                          >
                            g
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setWeightUnits("mg")}
                          >
                            mg
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </InputGroup>
                  </div>
                  <div className="col-span-2">
                    <Input
                      label={t("addProductPage.shippingFees")}
                      value={price}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DrawerFooter className="flex items-end">
            <DrawerClose asChild>
              <Button size="default" className="w-36">
                {t("addProductPage.add")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Card className="p-4">
        <DataTable
          title="Product Inventory"
          data={filteredData}
          columns={paddedProductColumns}
          selectionMode="multiple"
          paginator
          header={
            <div className="flex md:flex-row items-center justify-between gap-3 flex-wrap">
              <div className="flex gap-4">
                <Input
                  startIcon={<Search />}
                  type="text"
                  placeholder={t("productList.searchProducts")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      {categoryFilter === "all"
                        ? t("productList.categories.all")
                        : t(`productList.categories.${categoryFilter}`)}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="start"
                    className="space-y-1"
                  >
                    {categoryOptions.map(({ key, label }) => (
                      <DropdownMenuItem
                        key={key}
                        onSelect={() => setCategoryFilter(key)}
                        className="flex items-center justify-between"
                      >
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Dialog
                size={isMobile ? "sm" : "lg"}
                onCloseClickOutside
                ariaLabelCloseMessage={t("addProductPage.discard")}
                showScroll
              >
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="w-4 h-4" /> {t("addProductPage.add")}
                  </Button>
                </DialogTrigger>

                <DialogContent
                  variant="info"
                  className="!pt-0 !px-0 min-h-[90%]"
                >
                  <DialogHeader className="px-5 py-2">
                    <Tabs
                      defaultValue={selectedDialogTab}
                      onValueChange={setSelectedDialogTab}
                      value={selectedDialogTab}
                      className="w-full flex"
                    >
                      <TabsList
                        variant="underlined"
                        layout="horizontal"
                        tabsList={tabsList}
                        onValueChange={setSelectedDialogTab}
                        value={selectedDialogTab}
                      />
                    </Tabs>
                  </DialogHeader>

                  <div className="p-4 overflow-y-auto">
                    {selectedDialogTab === "general" && (
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 flex flex-col gap-4">
                          <Card>
                            <CardHeader className="!py-2">
                              <CardTitle className="text-lg font-medium">
                                {t("addProductPage.basicInfo")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <Input
                                label={t("addProductPage.productName")}
                                required
                                placeholder={t(
                                  "addProductPage.productNamePlaceholder"
                                )}
                              />
                              <Textarea
                                label={t("addProductPage.description")}
                                className="!h-[200px]"
                              />
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="!py-2">
                              <CardTitle className="text-lg font-medium">
                                {t("addProductPage.pricing")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-6">
                              <Input
                                type="text"
                                label={t("addProductPage.price")}
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                inputMode="decimal"
                              />
                              <Input
                                type="text"
                                label={t("addProductPage.comparePrice")}
                                required
                                value={comparePrice}
                                onChange={(e) =>
                                  setComparePrice(e.target.value)
                                }
                                inputMode="decimal"
                              />
                              <Input
                                type="text"
                                label={t("addProductPage.costPerItem")}
                                required
                                value={costPerItem}
                                onChange={(e) => setCostPerItem(e.target.value)}
                                inputMode="decimal"
                              />
                              <Input
                                type="text"
                                label={t("addProductPage.taxRate")}
                                required
                                value={taxRate}
                                onChange={(e) => setTaxRate(e.target.value)}
                                inputMode="decimal"
                              />
                            </CardContent>
                          </Card>
                        </div>

                        <div className="col-span-12 flex flex-col gap-4">
                          <Card>
                            <CardContent>
                              <FileUpload
                                files={files}
                                setFiles={setFiles}
                                multiple
                                allowedFileTypes={[
                                  "PNG",
                                  "JPEG",
                                  "JPG",
                                  "PDF",
                                  "ZIP",
                                ]}
                                allowedMaxMb={100}
                                progressTexts={progressTexts}
                                invalidSingleFileMessage={t(
                                  "addProductPage.fileUpload.invalidSingleFileMessage"
                                )}
                                invalidFileNameMessage={t(
                                  "addProductPage.fileUpload.invalidSingleFileMessage"
                                )}
                                invalidFileTypeMessage={t(
                                  "addProductPage.fileUpload.invalidFileTypeMessage"
                                )}
                                invalidFileSizeMessage={t(
                                  "addProductPage.fileUpload.invalidFileSizeMessage"
                                )}
                                dragDropOrSelectFileMessage={t(
                                  "addProductPage.fileUpload.dragDropOrSelectFileMessage"
                                )}
                                selectFileText={t(
                                  "addProductPage.fileUpload.selectFileText"
                                )}
                                forbiddenCharsLabel={t(
                                  "addProductPage.fileUpload.forbiddenCharsLabel"
                                )}
                                fileUploadedText={t(
                                  "addProductPage.fileUpload.fileUploadedText"
                                )}
                                errorPrefixMessage={t(
                                  "addProductPage.fileUpload.errorPrefixMessage"
                                )}
                                fileSizeUnit={t(
                                  "addProductPage.fileUpload.fileSizeUnit"
                                )}
                                uploadLimitMessage={t(
                                  "addProductPage.fileUpload.uploadLimitMessage"
                                )}
                              />
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="!py-2">
                              <CardTitle className="text-lg font-medium">
                                {t("addProductPage.organization")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <h3 className="text-sm font-medium">
                                {t("addProductPage.category")}
                              </h3>
                              <Picker
                                items={categoryOptions}
                                onValueChange={(v) =>
                                  console.log("Category:", v)
                                }
                                placeholder={t(
                                  "addProductPage.picker.placeholderSelectAnItems"
                                )}
                                more={t("addProductPage.picker.more")}
                                searchPlaceholder={t(
                                  "addProductPage.picker.searchPlaceholder"
                                )}
                                selectAll={t("addProductPage.picker.selectAll")}
                                noResultsFound={t(
                                  "addProductPage.picker.noResultsFound"
                                )}
                                noAvailableItems={t(
                                  "addProductPage.picker.noAvailableItems"
                                )}
                                className="!w-full"
                              />

                              <h3 className="text-sm font-medium">
                                {t("addProductPage.tag")}
                              </h3>
                              <Picker
                                items={tagOptions}
                                multiple
                                onValueChange={(v) => console.log("Tags:", v)}
                                placeholder={t(
                                  "addProductPage.picker.placeholderSelectAnItems"
                                )}
                                more={t("addProductPage.picker.more")}
                                searchPlaceholder={t(
                                  "addProductPage.picker.searchPlaceholder"
                                )}
                                selectAll={t("addProductPage.picker.selectAll")}
                                noResultsFound={t(
                                  "addProductPage.picker.noResultsFound"
                                )}
                                noAvailableItems={t(
                                  "addProductPage.picker.noAvailableItems"
                                )}
                                className="!w-full"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {selectedDialogTab === "variation" && (
                      <div className="space-y-4 min-h-64">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg font-medium mb-2">
                              {t("addProductPage.variants")}
                            </CardTitle>
                            <CardDescription>
                              {t("addProductPage.variantsDescription")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {variants.map((id) => (
                              <div
                                key={id}
                                className="flex items-center gap-4 border-b-2 p-2"
                              >
                                <Input label={t("addProductPage.variant")} />
                                <Input
                                  label={t("addProductPage.price")}
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                                <Input
                                  label={t("addProductPage.stockKeepingUnit")}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeVariant(id)}
                                  className="text-destructive mt-5 mr-24"
                                >
                                  <X />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={addVariant}
                              className="w-full"
                            >
                              <Plus /> {t("addProductPage.addField")}
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {selectedDialogTab === "shipping" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <Label>{t("addProductPage.width")}</Label>
                          <InputGroup>
                            <Input externalClassname="w-full" />
                            <Button
                              onClick={() => setIsWidthMenuOpen(true)}
                              variant="outline"
                            >
                              {widthUnits} <ChevronDown className="ml-2" />
                            </Button>
                            <DropdownMenu
                              open={isWidthMenuOpen}
                              onOpenChange={() =>
                                setIsWidthMenuOpen(!isWidthMenuOpen)
                              }
                            >
                              <DropdownMenuTrigger />
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => setWidthUnits("cm")}
                                >
                                  cm
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => setWidthUnits("m")}
                                >
                                  m
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => setWidthUnits("mm")}
                                >
                                  mm
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </InputGroup>
                        </div>

                        <div className="flex flex-col gap-1">
                          <Label>{t("addProductPage.height")}</Label>
                          <InputGroup>
                            <Input externalClassname="w-full" />
                            <Button
                              onClick={() => setIsHeightMenuOpen(true)}
                              variant="outline"
                            >
                              {heightUnits} <ChevronDown className="ml-2" />
                            </Button>
                            <DropdownMenu
                              open={isHeightMenuOpen}
                              onOpenChange={() =>
                                setIsHeightMenuOpen(!isHeightMenuOpen)
                              }
                            >
                              <DropdownMenuTrigger />
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => setHeightUnits("cm")}
                                >
                                  cm
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => setHeightUnits("mm")}
                                >
                                  mm
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => setHeightUnits("m")}
                                >
                                  m
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </InputGroup>
                        </div>

                        <div className="flex flex-col gap-1">
                          <Label>{t("addProductPage.weight")}</Label>
                          <InputGroup>
                            <Input externalClassname="w-full" />
                            <Button
                              onClick={() => setIsWeightMenuOpen(true)}
                              variant="outline"
                            >
                              {weightUnits} <ChevronDown className="ml-2" />
                            </Button>
                            <DropdownMenu
                              open={isWeightMenuOpen}
                              onOpenChange={() =>
                                setIsWeightMenuOpen(!isWeightMenuOpen)
                              }
                            >
                              <DropdownMenuTrigger />
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => setWeightUnits("kg")}
                                >
                                  kg
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => setWeightUnits("g")}
                                >
                                  g
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => setWeightUnits("mg")}
                                >
                                  mg
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </InputGroup>
                        </div>

                        <div className="col-span-2">
                          <Input
                            label={t("addProductPage.shippingFees")}
                            value={price}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <DialogFooter className="px-5">
                    <Button>{t("addProductPage.add")}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          }
          footer={
            <div className="p-2 text-sm text-muted-foreground flex justify-end">
              Toplam kayıt sayısı: {filteredData.length}
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default ProductTable;
