import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { byCategory } from "@/data/products";

export const Route = createFileRoute("/shop/")({ component: Shop });

const sections = [
  { key: "pecans" as const, title: "Pecans", blurb: "Raw, roasted, candied — from our own trees." },
  { key: "honey" as const, title: "Honey", blurb: "The plain wildflower jar, then five kitchen infusions at two dollars more." },
  { key: "gifts" as const, title: "Crates", blurb: "Packed for a porch, not a warehouse." },
];

function Shop() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">millcreekfarmga / shop</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">From the grove to the crate</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Direct from Mill Creek. Fresh, fairly priced, packed for a good table.
      </p>
      {sections.map((s) => (
        <section key={s.key} className="mt-12">
          <h2 className="font-display text-2xl">{s.title}</h2>
          <p className="mt-1 text-sm text-muted">{s.blurb}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {byCategory(s.key).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
