import Draggable from "react-draggable";
import {
  Button,
  Card,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "xyz-comp";

export default function DialogPage() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quae dolorem qui provident aliquid asperiores rem sint hic in nihil.</CardDescription>
        </CardHeader>
        <CardContent>
          <Draggable>
            <Dialog size="lg" variant="info" onCloseClickOutside={false} ariaLabelCloseMessage="Bu bir aria label close mesajıdır">
              <DialogTrigger>
                <Button>Modalı Aç</Button>
              </DialogTrigger>
              <DialogContent >
                <DialogHeader className="flex items-center justify-center">
                  <DialogTitle>Dialog Başlığı</DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col items-center justify-center gap-20">
                  <p>
                    Bu dialog içeriğinin açıklamasıdır. İstediğiniz içerikleri
                    buraya ekleyebilirsiniz.
                  </p>
                </DialogDescription>
                <DialogFooter>
                  <DialogClose>
                    <Button>Kapat</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Draggable>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alert Dialog</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quae dolorem qui provident aliquid asperiores rem sint hic in nihil.</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled>Cancel</AlertDialogCancel>
                <AlertDialogAction >Continue</AlertDialogAction>

              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Drawer</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quae dolorem qui provident aliquid asperiores rem sint hic in nihil.</CardDescription>
        </CardHeader>
        <CardContent>
          <Drawer direction="left" size="md" showScroll={true}>
            <DrawerTrigger>
              <Button variant="default" size="default">
                Drawer Aç
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Başlık</DrawerTitle>
                <DrawerDescription>Drawerın içindeki bilgiler</DrawerDescription>
              </DrawerHeader>

              <div className="flex flex-col items-center justify-center gap-20">
                <p> içerik </p>
                <p> içerik </p>
                <p> içerik </p>
                <p> içerik </p>
                <p> içerik </p>
                <p> içerik </p>
                <p> içerik </p>
                <p> içerik </p>
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button size="default">Kapat</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sheet</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quae dolorem qui provident aliquid asperiores rem sint hic in nihil.</CardDescription>
        </CardHeader>
        <CardContent>
          <Sheet >
            <SheetTrigger>
              <Button>Open (Sheet Bottom)</Button>
            </SheetTrigger>
            <SheetContent side={"bottom"} className="z-[9999999999]">
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>Sheet Description</SheetDescription>
              </SheetHeader>
              <SheetFooter>Footer</SheetFooter>
            </SheetContent>
            <SheetClose />
          </Sheet>
        </CardContent>
      </Card>

      <Card >
        <CardHeader>
          <CardTitle>Popover</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quae dolorem qui provident aliquid asperiores rem sint hic in nihil.</CardDescription>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger>
              <Button>Popover Content</Button>
              <PopoverContent className="w-40">
                <div className="flex flex-col gap-2">
                  <Button variant={"ghost"} size={"sm"} className="justify-start">item 1</Button>
                  <Button variant={"ghost"} size={"sm"} className="justify-start">item 2</Button>
                  <Button variant={"ghost"} size={"sm"} className="justify-start">item 3</Button>
                </div>
              </PopoverContent>
            </PopoverTrigger>
          </Popover>
        </CardContent>
      </Card>
    </div>
  );
}