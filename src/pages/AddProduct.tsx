import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FileUpload,
  FileItem,
  Heading,
  Input,
  Tabs,
  TabsList,
  Textarea,
  Picker,
  CardDescription,
  InputGroup,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Label,
} from "xyz-comp";
import { useTranslation } from "react-i18next";
import { ChevronDown, Plus, X } from "lucide-react";

type TabValue = "general" | "variation" | "shipping";
type TabItem = {
  name: string;
  value: string;
  icon: React.ReactNode;
  iconPlacement: "left" | "right";
  content: string;
  caption?: { display: boolean; text: string };
};

function AddProduct() {
  const [selectedTab, setSelectedTab] = useState<TabValue>("general");
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileItem[]>([]);

  const [price, setPrice] = useState("$ ");
  const [comparePrice, setComparePrice] = useState("$ ");
  const [costPerItem, setCostPerItem] = useState("$ ");
  const [taxRate, setTaxRate] = useState("$ ");
  const [isWidthMenuOpen, setIsWidthMenuOpen] = useState(false);
  const [widthUnits, setWidthUnits] = useState<"cm" | "mm" | "m">("cm");
  const [isHeightMenuOpen, setIsHeightMenuOpen] = useState(false);
  const [heightUnits, setHeightUnits] = useState<"cm" | "mm" | "m">("cm");
  const [isWeightMenuOpen, setIsWeightMenuOpen] = useState(false);
  const [weightUnits, setWeightUnits] = useState<"kg" | "g" | "mg">("kg");

  // Variation tab'i için state
  const [variants, setVariants] = useState<number[]>([]);

  // Yeni bir satır ekle
  const addVariant = () => {
    setVariants((prev) => [...prev, Date.now()]);
  };

  // Belirli bir satırı kaldır
  const removeVariant = (id: number) => {
    setVariants((prev) => prev.filter((v) => v !== id));
  };

  const progressTexts = {
    error: t("progress.error"),
    complete: t("progress.complete"),
    loading: t("progress.loading"),
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

  const categoryOptions = [
    { key: "cloths", label: t("addProductPage.categories.cloths") },
    { key: "bags", label: t("addProductPage.categories.bags") },
    { key: "shoes", label: t("addProductPage.categories.shoes") },
    { key: "watches", label: t("addProductPage.categories.watches") },
    { key: "devices", label: t("addProductPage.categories.devices") },
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <Heading headingLevel="h4">{t("addProductPage.title")}</Heading>
        <div className="flex items-center gap-2">
          <Button variant="outline">{t("addProductPage.discard")}</Button>
          <Button>{t("addProductPage.add")}</Button>
        </div>
      </div>

      <div>
        <Tabs
          defaultValue={selectedTab}
          onValueChange={setSelectedTab}
          value={selectedTab}
          className="w-full flex"
        >
          <TabsList
            variant="underlined"
            layout="horizontal"
            tabsList={tabsList}
            onValueChange={(value) => setSelectedTab(value as TabValue)}
            value={selectedTab}
          />
        </Tabs>

        <div className="mt-4">
          {selectedTab === "general" && (
            <div className="grid grid-cols-6 gap-4">
              <div className="lg:col-span-4 md:col-span-3 col-span-6 flex flex-col gap-4">
                <Card className="col-span-4 row-span-3">
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
                    />
                    <Textarea
                      label={t("addProductPage.description")}
                      className="!h-[200px]"
                    />
                  </CardContent>
                </Card>
                <Card className="col-span-4 row-span-2 row-start-4">
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

              <div className="lg:col-span-2 md:col-span-3 col-span-6 flex flex-col gap-4">
                <Card className="col-span-2 row-span-2 col-start-5 row-start-1">
                  <CardContent>
                    <FileUpload
                      files={files}
                      setFiles={setFiles}
                      multiple={true}
                      allowedFileTypes={["PNG", "JPEG", "JPG", "PDF", "ZIP"]}
                      allowedMaxMb={100}
                      progressTexts={progressTexts}
                      invalidSingleFileMessage={t(
                        "addProductPage.fileUpload.invalidSingleFileMessage"
                      )}
                      invalidFileNameMessage={t(
                        "addProductPage.fileUpload.invalidFileNameMessage"
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
                      fileSizeUnit={t("addProductPage.fileUpload.fileSizeUnit")}
                      uploadLimitMessage={t(
                        "addProductPage.fileUpload.uploadLimitMessage"
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="col-span-2 row-span-2 col-start-5 row-start-3">
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
                      onValueChange={(value) => console.log("Category:", value)}
                      placeholder={t(
                        "addProductPage.picker.placeholderSelectAnItems"
                      )}
                      more={t("addProductPage.picker.more")}
                      searchPlaceholder={t(
                        "addProductPage.picker.searchPlaceholder"
                      )}
                      selectAll={t("addProductPage.picker.selectAll")}
                      noResultsFound={t("addProductPage.picker.noResultsFound")}
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
                      onValueChange={(values) => console.log("Tags:", values)}
                      placeholder={t(
                        "addProductPage.picker.placeholderSelectAnItems"
                      )}
                      more={t("addProductPage.picker.more")}
                      searchPlaceholder={t(
                        "addProductPage.picker.searchPlaceholder"
                      )}
                      selectAll={t("addProductPage.picker.selectAll")}
                      noResultsFound={t("addProductPage.picker.noResultsFound")}
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
          {selectedTab === "variation" && (
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
                      <div className="flex-1 min-w-0">
                        <Input label={t("addProductPage.variant")} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Input
                          label={t("addProductPage.price")}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Input label={t("addProductPage.stockKeepingUnit")} />
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariant(id)}
                        className="text-red-500 mt-5 mr-24"
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
          {selectedTab === "shipping" && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium mb-2">
                    {t("addProductPage.shipping")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <Label>{t("addProductPage.width")}</Label>
                    <InputGroup>
                      <Input externalClassname="w-full" />
                      <Button
                        onClick={() => setIsWidthMenuOpen(true)}
                        variant={"outline"}
                      >
                        {widthUnits} <ChevronDown className="ml-2" />
                      </Button>

                      <DropdownMenu
                        open={isWidthMenuOpen}
                        onOpenChange={() =>
                          setIsWidthMenuOpen(!isWidthMenuOpen)
                        }
                      >
                        <DropdownMenuTrigger></DropdownMenuTrigger>
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
                  <div className="flex flex-col">
                    <Label>{t("addProductPage.height")}</Label>
                    <InputGroup>
                      <Input externalClassname="w-full" />
                      <Button
                        onClick={() => setIsHeightMenuOpen(true)}
                        variant={"outline"}
                      >
                        {heightUnits} <ChevronDown className="ml-2" />
                      </Button>

                      <DropdownMenu
                        open={isHeightMenuOpen}
                        onOpenChange={() =>
                          setIsHeightMenuOpen(!isHeightMenuOpen)
                        }
                      >
                        <DropdownMenuTrigger></DropdownMenuTrigger>
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
                  <div className="col-span-2 flex flex-col">
                    <Label>{t("addProductPage.weight")}</Label>
                    <InputGroup>
                      <Input externalClassname="w-full" />
                      <Button
                        onClick={() => setIsWeightMenuOpen(true)}
                        variant={"outline"}
                      >
                        {weightUnits} <ChevronDown className="ml-2" />
                      </Button>

                      <DropdownMenu
                        open={isWeightMenuOpen}
                        onOpenChange={() =>
                          setIsWeightMenuOpen(!setIsWeightMenuOpen)
                        }
                      >
                        <DropdownMenuTrigger></DropdownMenuTrigger>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
