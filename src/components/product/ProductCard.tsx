import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { money } from "@/lib/utils";
import { AddToCart } from "./AddToCart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-cream/40 shadow-[var(--shadow-border)]">
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-photo w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to="/shop/$slug"
              params={{ slug: product.slug }}
              className="font-display text-lg leading-snug text-ink hover:text-pecan"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-muted">{product.short}</p>
          </div>
          <p className="font-sans text-base font-medium tabular-nums">{money(product.retail)}</p>
        </div>
        <p className="text-xs text-muted">{product.weight} · direct from the farm</p>
        <div className="mt-auto">
          <AddToCart slug={product.slug} />
        </div>
      </div>
    </article>
  );
}
