import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { byCategory } from "@/data/products";
import { assetPath } from "@/lib/utils";

export const Route = createFileRoute("/georgia-pecans")({ component: Pecans });

function Pecans() {
  const pecans = byCategory("pecans");
  return (
    <main>
      <section className="relative min-h-[48vh] overflow-hidden">
        <img src={assetPath("/images/grove-harvest.jpg")} alt="Georgia pecan grove at harvest" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-honey">millcreekfarmga / georgia-pecans</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-paper sm:text-5xl">
            Georgia pecans, still tasting like the tree.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Why these are not grocery pecans</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Leslie planted the first blocks around the shop in 2003. Harvest started in 2010.
            Hunter brought roasting and cottage-food packing in 2018. The trees are Stuart,
            Summer, Cape Fear, Creek, and Gloria Grande — cracked and shelled on the farm,
            not blended in a warehouse two states away.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            A grocery pecan often sat. Ours go from shaker to sorter to bag.
            They weigh more than they look. They taste sweet without sugar
            because Georgia did the work. That is what we want people to learn
            here — not a mystery brand, a crop.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link to="/true-cost">How we price a bag</Link>
            </Button>
          </div>
        </div>
        <img src={assetPath("/images/farmer-hands.jpg")} alt="Farmer holding freshly cracked pecan halves" className="rounded-xl object-cover shadow-[var(--shadow-border)]" />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl">Halves, roasted, candied, dipped</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pecans.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
