import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

/** Prefix public files. Live Vercel builds pull grove photos from the GitHub repo. */
const IMAGE_CDN = "https://cdn.jsdelivr.net/gh/Pidgeon89/mill-creek-farms@main/public";

export function assetPath(path: string) {
  if (!import.meta.env.DEV && (path.startsWith("/images/") || path === "/og.jpg")) {
    return `${IMAGE_CDN}${path}`;
  }
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  if (!path.startsWith("/") || !base) return path;
  return `${base}${path}`;
}
