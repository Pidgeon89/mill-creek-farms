import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { byCategory } from "@/data/products";
import { assetPath } from "@/lib/utils";

export const Route = createFileRoute("/honey")({ component: Honey });

function Honey() {
  const jars = byCategory("honey");
  return (
    <main>
      <section className="relative min-h-[46vh] overflow-hidden">
        <img src={assetPath("/images/honey.jpg")} alt="Raw wildflower honey from Mill Creek Farms" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-honey">millcreekfarmga / honey</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-paper sm:text-5xl">
            Raw wildflower honey from the same bloom as the grove.
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          The bees work gallberry, clover, and whatever Coastal Empire is flowering between
          Mill Creek and the pines. We do not ultra-filter. We do not cook the character out.
          If it clouds in January, that is honey doing what honey does.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {jars.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
