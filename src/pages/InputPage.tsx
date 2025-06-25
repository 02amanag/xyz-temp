import { cn } from '@/lib/utils';
import { Bell, CableIcon, Search } from 'lucide-react';
import React from 'react';
import InputMask from 'react-input-mask';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Switch,
  InputGroup,
  InputGroupAddon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'xyz-comp';

export default function InputPage() {
  const [open, setOpen] = React.useState(false);
  const [valRed, setValRed] = React.useState(false);
  const [valNeon, setValNeon] = React.useState(false);
  const [valThick, setValThick] = React.useState(false);
  const [valCustom, setValCustom] = React.useState(false);
  const [valPrimary, setValPrimary] = React.useState(false);
  const [valOutline, setValOutline] = React.useState(false);

  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Labels and Helpers */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Labels & Helpers</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5">
          <div className='flex flex-col gap-3'>
            <Input label='Label' />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Float Label</Label>
            <Input floatLabel='Float Label' />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Colored Helptext</Label>
            <Input helpText='Yellow help' helptextClassname='text-yellow-500' />
            <Input helpText='Red help' helptextClassname='text-red-500' />
            <Input helpText='Blue help' helptextClassname='text-blue-500' />
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <Label>Helptext</Label>
            <Input helpText='Enter your username to reset your password.' />
          </div>
        </CardContent>
      </Card>

      {/* Input States */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Input States</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5">
          <div className='flex flex-col gap-3'>
            <Label>Readonly</Label>
            <Input defaultValue="Test" readOnly />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Disabled Input</Label>
            <Input disabled startIcon={<Search />} />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Loading Input</Label>
            <Input loading type='password' />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Invalid Input</Label>
            <Input invalid helpText="Enter your username to reset your password." />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Password Input</Label>
            <Input placeholder='Enter Password' type='password' defaultValue={"React Js"} />
          </div>
        </CardContent>
      </Card>

      {/* Input Sizes */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Input Sizes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5">
          <div className='flex flex-col gap-3'>
            <Label>Small Input</Label>
            <Input size="sm" />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Default Input</Label>
            <Input />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>Large Input</Label>
            <Input size="lg" />
          </div>
        </CardContent>
      </Card>

      {/* Input Icons */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Input Icons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5">
          <div className='flex flex-col gap-3'>
            <Label>With Start Icon</Label>
            <Input startIcon={<Search />} placeholder='Search...' />
          </div>
          <div className='flex flex-col gap-3'>
            <Label>With End Icon</Label>
            <Input endIcon={<Search />} placeholder='Search...' />
          </div>
        </CardContent>
      </Card>

      {/* Masked Inputs */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Masked Inputs</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5">
          <InputMask mask="+90 (599) 999 99 99" maskChar={null}>
            {(inputProps) => <Input label='Telefon Mask' {...inputProps} />}
          </InputMask>
          <InputMask mask="99999999999" maskChar={null}>
            {(inputProps) => <Input label='TC Mask' {...inputProps} />}
          </InputMask>
          <InputMask mask="9999-9999-9999-9999" maskChar={null}>
            {(inputProps) => <Input label='Kredi Kartı Mask' {...inputProps} />}
          </InputMask>
        </CardContent>
      </Card>

      {/* Key Filter Inputs */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Key Filter Inputs</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5 flex-wrap">
          <Input keyFilter='number' label='Number Only' />
          <Input keyFilter='text' label='Text Only' />
        </CardContent>
      </Card>

      {/* Switch Variants */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Switch Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch variant="primary" label="Primary" checked={valPrimary} onCheckedChange={setValPrimary} />
            <span>{valPrimary ? "Açık" : "Kapalı"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch variant="outline" label="Outline" checked={valOutline} onCheckedChange={setValOutline} />
            <span>{valOutline ? "Açık" : "Kapalı"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch variant="redAccent" label="Red" checked={valRed} onCheckedChange={setValRed} />
            <span>{valRed ? "Açık" : "Kapalı"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch variant="thickBorder" label="Thick Border" checked={valThick} onCheckedChange={setValThick} />
            <span>{valThick ? "Açık" : "Kapalı"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch variant="neon" label="Neon" checked={valNeon} onCheckedChange={setValNeon} />
            <span>{valNeon ? "Açık" : "Kapalı"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              label="Custom"
              checked={valCustom}
              onCheckedChange={setValCustom}
              className={cn("rounded-md", "data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-200")}
            />
            <span>{valCustom ? "Açık" : "Kapalı"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Label Example */}
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Label Example</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo minima vero repudiandae totam, odit
            dignissimos doloribus, numquam praesentium tempora consequatur dicta fuga porro maxime incidunt expedita nulla ratione perferendis!
            Beatae ea officiis perspiciatis laboriosam hic, eius quae sed dolor asperiores in iure non, cupiditate sit accusamus sunt totam! Vel, fugiat.
          </Label>
        </CardContent>
      </Card>

      <div className='col-span-12 grid grid-cols-12 gap-3'>
        {/* Checkbox and Radio */}
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Checkbox & Radio</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label className="block mb-1">Checkbox</Label>
              <div className='flex gap-3'>
                <Checkbox checked />
                <Checkbox />
              </div>
            </div>
            <div>
              <Label className="block mb-1">Radio Group</Label>
              <RadioGroup className="flex gap-3">
                <RadioGroupItem value="1" />
                <RadioGroupItem value="2" />
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Input Group */}
        <Card className='col-span-9'>
          <CardHeader>
            <CardTitle>Input Group</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <InputGroup className="flex-wrap">
              <InputGroupAddon><Checkbox /></InputGroupAddon>
              <Button>Test</Button>
              <InputGroupAddon><Checkbox /></InputGroupAddon>
              <Button onClick={() => setOpen(true)} variant="outline">Dropdown</Button>
              <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
                <DropdownMenuTrigger />
                <DropdownMenuContent>
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <InputGroupAddon><Bell /></InputGroupAddon>
              <Input />
              <InputGroupAddon><CableIcon /></InputGroupAddon>
              <InputGroupAddon><CableIcon /></InputGroupAddon>
              <Button variant="destructive" onClick={() => alert("test")}>Test</Button>
            </InputGroup>

            <InputGroup>
              <Input />
              <Button variant="destructive" onClick={() => alert("test")}>Test</Button>
            </InputGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}