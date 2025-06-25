import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FileUpload,
  Input,
  Calendar,
  DateRangeLabels,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  CardHeader,
  CardTitle,
  CardContent,
  Label,
  DatePicker,
  FileItem,
  Alert,
  AlertActions,
  AlertClose,
  AlertDescription,
  AlertTitle,
  Picker,
  Progress,
  Textarea,
  toast,
  CardDescription,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "xyz-comp";

function FormPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [value, setValue] = useState("option1");

  const [isUploading, setIsUploading] = useState(false);
  const [selectDateRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });
  const [selectedDate, setSelectDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(),
  });

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        setError(true);
        clearInterval(interval);
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      setError(true);
    }
  }, [progress]);

  const progressTexts = {
    error: t("progress.error"),
    complete: t("progress.complete"),
    loading: t("progress.loading"),
  };

  const textareaTexts = {
    label: "Mesaj",
    textareaPlaceholder: t("textarea.textareaPlaceholder"),
    textareaHelperText: t("textarea.textareaHelperText"),
  };

  const pickerTexts = {
    placeholderFilterItems: t("picker.placeholderFilterItems"),
    placeholderSelectAnItems: t("picker.placeholderSelectAnItems"),
    placeholderSelectMultipleItems: t("picker.placeholderSelectMultipleItems"),
    more: t("picker.more"),
    searchPlaceholder: t("picker.searchPlaceholder"),
    selectAll: t("picker.selectAll"),
    noResultsFound: t("picker.noResultsFound"),
    noAvailableItems: t("picker.noAvailableItems"),
  };

  const items = useMemo(() => [
    { key: "0", label: "Apple Banana Orange Grape" },
    { key: "1", label: "Apple" },
    { key: "2", label: "Banana" },
    { key: "3", label: "Orange" },
    { key: "4", label: "Grape" },
    { key: "6", label: "Carrot" },
    { key: "7", label: "Broccoli" },
    { key: "8", label: "Lettuce" },
    { key: "9", label: "Spinach" },
    { key: "10", label: "Pineapple" },
    { key: "11", label: "Watermelon" },
  ], []); // Empty dependency array ensures it's only created once.

  // Memoize the computation of largeArray so it's only recalculated when "items" changes.
  const largeArray = useMemo(() => {
    const repeatCount = Math.ceil(20000 / items.length);
    const baseArray = Array.from({ length: repeatCount }, () =>
      items.map((item) => ({ ...item }))
    ).flat();

    // Return a new array with updated keys, avoiding in-render mutation
    return baseArray.map((item, index) => ({
      ...item,
      key: index.toString(),
    }));
  }, [items]);

  const dateRangeLabels: DateRangeLabels = {
    today: t("datepicker.today"),
    yesterday: t("datepicker.yesterday"),
    thisWeek: t("datepicker.thisWeek"),
    lastWeek: t("datepicker.lastWeek"),
    lastSevenDay: t("datepicker.lastSevenDay"),
    thisMonth: t("datepicker.thisMonth"),
    lastMonth: t("datepicker.lastMonth"),
    thisYear: t("datepicker.thisYear"),
    lastYear: t("datepicker.lastYear")
  };

  const months = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december")
  ];

  const formSchema = z.object({
    name: z.string().min(1, t("form.required")),
    email: z.string().email(t("form.invalid-email")),
    files: z.array(z.any()).optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      files: [],
    },
  });

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    console.log(data);

    setTimeout(() => {
      setLoading(false);
      alert("Form Gönderildi");
      form.reset();
    }, 3000);
  };

  useEffect(() => {
    console.log("Güncellenen Dosyalar:", form.watch("files"));
  }, [form.watch("files")]);

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <h2 className="text-xl font-semibold mb-4">Form Örneği</h2>
        <Form form={form} onSubmit={handleSubmit} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            required
            render={({ field }) => (
              <FormItem>
                <FormLabel>İsim</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="İsminizi Giriniz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            required
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={loading}
                    placeholder="Email Adresinizi Giriniz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosya Yükleme</FormLabel>
                <FormControl>
                  <FileUpload
                    files={field.value || []}
                    setFiles={field.onChange}
                    multiple={true}
                    allowedFileTypes={["PNG", "JPEG", "JPG", "PDF"]}
                    allowedMaxMb={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-9 col-span-12">
              <Textarea
                maxRows={10}
                disabled={false}
                readOnly={false}
                maxLength={100}
                className="resize min-h-72"
                placeholder={textareaTexts.textareaPlaceholder}
                label={textareaTexts.label}
                helperText={textareaTexts.textareaHelperText}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-3 col-span-12">
              <Label>Tarih</Label>
              <Card className="flex justify-center">
                <Calendar className="" />
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => form.reset()}
            >
              Reset
            </Button>


            <Button type="submit" isLoading={loading}>
              Gönder
            </Button>
          </div>
        </Form>
      </Card>


      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>File Upload Component</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FileUpload
              files={files}
              setFiles={setFiles}
              multiple={true}
              title="Başlık"
              allowedFileTypes={["PNG", "JPEG", "JPG", "PDF", "ZIP"]}
              allowedMaxMb={100}
              onUploadStatusChange={setIsUploading}
              progressTexts={progressTexts}
              // Diğer metinsel prop’lar
              invalidSingleFileMessage="You can only upload one file."
              invalidFileNameMessage="Invalid filename"
              invalidFileTypeMessage="File type not supported"
              invalidFileSizeMessage="File size too large"
              dragDropOrSelectFileMessage="Drag and drop, or"
              selectFileText="select a file"
              forbiddenCharsLabel="Forbidden characters:"
              fileUploadedText="Uploaded"
              errorPrefixMessage="Error:"
              fileSizeUnit="MB"

              // Örneğin İngilizce kullanım:
              uploadLimitMessage="max." // Ekranda "100 MB max." şeklinde görünecek.
            />

            <Button className="w-28" disabled={isUploading}>
              Test
            </Button>
          </CardContent>
        </Card>



        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Picker Komponent</CardTitle>
              <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia libero numquam ducimus porro laboriosam debitis dolorem ab in enim! Quaerat.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <h3 className="text-sm font-medium mb-4">
                Single Select
              </h3>
              <Picker
                items={[]}
                onValueChange={(value) => console.log(value)}
                placeholder={pickerTexts.placeholderSelectAnItems}
                more={pickerTexts.more}
                searchPlaceholder={pickerTexts.searchPlaceholder}
                selectAll={pickerTexts.selectAll}
                noResultsFound={pickerTexts.noResultsFound}
                className="!w-full"
                noAvailableItems={pickerTexts.noAvailableItems}
              />


              <h3 className="text-sm font-medium mb-2 text-slate-700">
                Single Select And Filter
              </h3>
              <Picker
                items={largeArray}
                onValueChange={(value) => console.log(value)}
                placeholder={pickerTexts.placeholderSelectAnItems}
                more={pickerTexts.more}
                searchPlaceholder={pickerTexts.searchPlaceholder}
                selectAll={pickerTexts.selectAll}
                noResultsFound={pickerTexts.noResultsFound}
                noAvailableItems={pickerTexts.noAvailableItems}
                className="!w-full"
              />



              <h3 className="text-sm font-medium mb-2 text-slate-700">
                Multi Select
              </h3>
              <Picker
                items={largeArray}
                multiple
                onValueChange={(value) => console.log(value)}
                placeholder={pickerTexts.placeholderSelectMultipleItems}
                more={pickerTexts.more}
                searchPlaceholder={pickerTexts.searchPlaceholder}
                selectAll={pickerTexts.selectAll}
                noResultsFound={pickerTexts.noResultsFound}
                noAvailableItems={pickerTexts.noAvailableItems}
                className="!w-full"
              />


              <h3 className="text-sm font-medium mb-2 text-slate-700">
                Multi Select And Filter
              </h3>
              <Picker
                items={largeArray}
                multiple
                className="!w-full"
                filter
                onValueChange={(value) => console.log(value)}
                placeholder={pickerTexts.placeholderFilterItems}
                more={pickerTexts.more}
                searchPlaceholder={pickerTexts.searchPlaceholder}
                selectAll={pickerTexts.selectAll}
                noResultsFound={pickerTexts.noResultsFound}
                noAvailableItems={pickerTexts.noAvailableItems}
              />
            </CardContent>
          </Card>

          <Card >
            <CardHeader>
              <CardTitle>Dropdown Menu Compoent</CardTitle>
              <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia libero numquam ducimus porro laboriosam debitis dolorem ab in enim! Quaerat.</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button>Dropdown Menu Component</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Lorem, ipsum. 1</DropdownMenuItem>
                  <DropdownMenuItem>Lorem, ipsum. 2</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Lorem, ipsum. 3</DropdownMenuItem>
                  <DropdownMenuItem>Lorem, ipsum. 4</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toast Component</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic optio temporibus eius iusto! Quos id laudantium quam iusto expedita praesentium?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() =>
                toast({
                  title: 'Title',
                  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                  variant: "success",
                  className: "bg-primary text-primary-foreground border-none text-sm",
                  duration: 3000
                })}
              >
                Open Toast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Page</CardTitle>
              <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia libero numquam ducimus porro laboriosam debitis dolorem ab in enim! Quaerat.</CardDescription>
            </CardHeader>
            <CardContent className="">
              {/* 1) Normal Tonlar */}
              <div className="space-y-4">
                <Button onClick={() => setOpen(true)}>Alerti aç</Button>

                <Alert defaultOpen>
                  <AlertClose />
                  <AlertTitle>Test</AlertTitle>
                  <AlertDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo.</AlertDescription>
                  <AlertActions className="flex justify-end">
                    <Button variant="outline">Redo</Button>
                    <Button variant="outline">Undo</Button>
                  </AlertActions>
                </Alert>

                <Alert onOpenChange={() => setOpen(!open)} open={open} variant="info">
                  <AlertClose />
                  <AlertTitle>Test</AlertTitle>
                  <AlertDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo.</AlertDescription>
                  <AlertActions className="flex justify-start">
                    <Button variant="outline">Redo</Button>
                    <Button variant="outline">Undo</Button>
                  </AlertActions>
                </Alert>

                <Alert onOpenChange={() => setOpen(!open)} open={open} variant="infoDark">
                  <AlertClose />
                  <AlertTitle>Test</AlertTitle>
                  <AlertDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo.</AlertDescription>
                  <AlertActions className="flex justify-end">
                    <Button variant={"outline"}>Redo</Button>
                    <Button variant={"outline"}>Undo</Button>
                  </AlertActions>
                </Alert>

              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Datepicker Component</CardTitle>
              <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia libero numquam ducimus porro laboriosam debitis dolorem ab in enim! Quaerat.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <Label>Date Picker</Label>
                <DatePicker
                  months={months}
                  dateRangeLabels={dateRangeLabels}
                  date={selectedDate}
                  onDateSelect={({ from, to }) => {
                    setSelectDate({ from, to });
                  }}
                  variant="outline"
                  closeOnSelect={true}
                  numberOfMonths={1}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Date Range Picker</Label>
                <DatePicker
                  months={months}
                  dateRangeLabels={dateRangeLabels}
                  date={selectDateRange}
                  onDateSelect={({ from, to }) => {
                    setSelectedRange({ from, to });
                  }}
                  variant="outline"
                  closeOnSelect={true}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Component</CardTitle>
              <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia libero numquam ducimus porro laboriosam debitis dolorem ab in enim! Quaerat.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-7">
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                    <SelectItem value="option4">Option 4</SelectItem>
                    <SelectItem value="option5">Option 5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progress Component</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit exercitationem totam voluptatem inventore quasi, repellat quis vero iusto sapiente obcaecati voluptates eius dignissimos. Ipsum sit, repellendus harum at veritatis asperiores facere aspernatur vel fugit voluptas cumque blanditiis eius corrupti sapiente autem maxime debitis perferendis qui adipisci expedita nostrum? Repudiandae quaerat atque id placeat quidem nulla illo ut error rem, corporis culpa. Eveniet odio ea tenetur explicabo? Nesciunt quae esse voluptate quisquam quidem tenetur commodi magni voluptatem possimus in cumque recusandae voluptatibus, amet sequi autem inventore doloremque ullam atque placeat odit sed libero, provident animi. Sunt sint natus dolorem quasi dolorum?</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10 p-5">
            <Progress value={progress} isRounded={false} texts={progressTexts} />
            <Progress
              value={progress}
              isRounded={false}
              showProgress={false}
              texts={progressTexts}
            />
            <Progress value={progress} isRounded={true} texts={progressTexts} />
            <Progress
              value={progress}
              isRounded={true}
              showProgress={false}
              texts={progressTexts}
            />
            <Progress
              value={progress}
              isRounded={false}
              isError={error}
              texts={progressTexts}
            />
            <Progress
              value={progress}
              isRounded={true}
              isError={error}
              texts={progressTexts}
            />
            <div className="flex">
              <div className="w-52 h-52">
                <Progress
                  value={progress}
                  variant="circle"
                  texts={progressTexts}
                />
              </div>
              <div className="w-52 h-52">
                <Progress
                  value={progress}
                  showProgress={false}
                  variant="circle"
                  texts={progressTexts}
                />
              </div>
              <div className="w-52 h-52">
                <Progress
                  value={progress}
                  variant="circle"
                  isError={error}
                  texts={progressTexts}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FormPage;
