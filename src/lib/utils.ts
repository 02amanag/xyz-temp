import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseHslToHex(hsl: string): string {
  const [hStr, sStr, lStr] = hsl.split(" ");
  if (!hStr || !sStr || !lStr) return "#000000";

  const h = parseFloat(hStr);
  const s = parseFloat(sStr) / 100;
  const l = parseFloat(lStr) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let [r, g, b] =
    h < 60 ? [c, x, 0] :
      h < 120 ? [x, c, 0] :
        h < 180 ? [0, c, x] :
          h < 240 ? [0, x, c] :
            h < 300 ? [x, 0, c] : [c, 0, x];

  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export const imageArray = [
  {
    src: "https://plus.unsplash.com/premium_photo-1681412205645-2d2149074ae1?q=80&w=1974&auto=format&fit=crop",
    placeholderSrc: "https://plus.unsplash.com/premium_photo-1681412205645-2d2149074ae1?q=80&w=20&auto=format&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1729731322270-02b5a5701a17?q=80&w=1974&auto=format&fit=crop",
    placeholderSrc: "https://images.unsplash.com/photo-1729731322270-02b5a5701a17?q=80&w=20&auto=format&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=1974&auto=format&fit=crop",
    placeholderSrc: "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=20&auto=format&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1974&auto=format&fit=crop",
    placeholderSrc: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=20&auto=format&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1730304053583-f0660928f2f4?q=80&w=1976&auto=format&fit=crop",
    placeholderSrc: "https://images.unsplash.com/photo-1730304053583-f0660928f2f4?q=80&w=20&auto=format&fit=crop",
  },
];