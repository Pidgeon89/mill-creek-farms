import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { byCategory } from "@/data/products";
import { assetPath } from "@/lib/utils";

export const Route = createFileRoute("/honey")({ component: Honey });

function Honey() {
  const jars = byCategory("honey");
  const plain = jars.filter((p) => p.slug.startsWith("wildflower"));
  const infused = jars.filter((p) => !p.slug.startsWith("wildflower"));
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
          {plain.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <p className="mt-16 text-xs font-medium uppercase tracking-[0.18em] text-muted">From the kitchen</p>
        <h2 className="mt-2 font-display text-3xl">Five infusions. Two dollars more.</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Same raw wildflower honey, finished with lemon, lavender, jalapeño, ginger, or garlic.
          The extra two dollars is the fruit, flower, or fire — not a different hive.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {infused.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
