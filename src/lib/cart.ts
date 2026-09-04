import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/data/products";

export type CartLine = {
  slug: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (slug, qty = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.slug === slug);
        if (i >= 0) lines[i] = { slug, qty: lines[i].qty + qty };
        else lines.push({ slug, qty });
        set({ lines });
      },
      setQty: (slug, qty) => {
        if (qty <= 0) set({ lines: get().lines.filter((l) => l.slug !== slug) });
        else
          set({
            lines: get().lines.map((l) => (l.slug === slug ? { slug, qty } : l)),
          });
      },
      remove: (slug) => set({ lines: get().lines.filter((l) => l.slug !== slug) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "mcf-cart" },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((s, l) => s + l.qty, 0);
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((s, l) => {
    const p = getProduct(l.slug);
    return s + (p ? p.retail * l.qty : 0);
  }, 0);
}
