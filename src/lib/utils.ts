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

/** Prefix public files so the live millcreekfarmga path still finds photos. */
export function assetPath(path: string) {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  if (!path.startsWith("/") || !base) return path;
  return `${base}${path}`;
}
