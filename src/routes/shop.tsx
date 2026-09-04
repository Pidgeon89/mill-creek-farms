import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop")({ component: Shop });

function Shop() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">millcreekfarmga / shop</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">From the grove to the crate</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Direct from Mill Creek. Fresh, fairly priced, packed for a good table.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
