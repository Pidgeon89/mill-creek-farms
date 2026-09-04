import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Gift, Trees } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <main>
      <section className="relative min-h-[72vh] overflow-hidden">
        <img
          src="/images/orchard-hero.jpg"
          alt="Pecan orchard at Mill Creek Farms, Statesboro, Georgia"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/35 to-ink/20" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-honey">
            millcreekfarmga · Statesboro, Georgia
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] text-paper sm:text-6xl">
            From our Georgia grove to your table.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
            Pecans from our own trees. Honey from the same bloom. A farm you
            can taste — and a little of how it actually grows.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/shop">
                Shop the grove <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="invert" size="lg">
              <Link to="/true-cost">How we price a bag</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
        {[
          {
            icon: Trees,
            title: "The farm first",
            body: "A family orchard on Mill Creek. Trees that take years. Honey from the same bloom. Everything starts in Statesboro.",
          },
          {
            icon: BookOpen,
            title: "Learn the grove",
            body: "Why Georgia pecans taste sweeter. How a tree waits almost a decade. What harvest actually looks like. We like teaching it.",
          },
          {
            icon: Gift,
            title: "A good experience",
            body: "A bag that still tastes like the tree. A crate that feels like it came from a porch, not a warehouse. That is the point.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-xl bg-cream/50 p-6 shadow-[var(--shadow-border)]">
            <item.icon className="size-5 text-pecan" strokeWidth={1.6} />
            <h2 className="mt-4 font-display text-xl">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">A pecan year</p>
        <h2 className="mt-2 font-display text-3xl">How the grove actually works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              k: "01",
              t: "Plant and wait",
              b: "Leslie set the first trees in 2003. A pecan orchard does not pay for six to eight years. That is the real start of a bag.",
            },
            {
              k: "02",
              t: "A humid Georgia summer",
              b: "Stuart, Summer, Cape Fear, Creek, Gloria Grande. Water, weather, and a long season sit inside the nut before anyone tastes it.",
            },
            {
              k: "03",
              t: "Shake, sort, send",
              b: "Harvest in the fall. Crack and sort on the farm. Roast or candy in the kitchen. Then a bag that still tastes like the tree.",
            },
          ].map((s) => (
            <article key={s.k}>
              <p className="font-sans text-xs tracking-[0.16em] text-honey">{s.k}</p>
              <h3 className="mt-2 font-display text-xl">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.b}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">From the farm kitchen</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">What we put in a bag</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-pecan sm:inline">
            Full shop
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto my-16 grid max-w-6xl overflow-hidden rounded-xl bg-bark text-paper shadow-[var(--shadow-border)] md:grid-cols-2">
        <img src="/images/farm-porch.jpg" alt="Mill Creek Farms porch with pecans and honey" className="h-full min-h-64 w-full object-cover" />
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-honey">Come by the farm</p>
          <h2 className="mt-3 font-display text-3xl">The grove is the experience.</h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Pickup on Mill Creek Road, or a crate packed like it left the porch.
            Either way you get the farm — not a blended bin with a Georgia sticker.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Some of the people here came from service, and are learning this
            work as a way to give back. The farm is still the story.
          </p>
          <div className="mt-6">
            <Button asChild variant="invert">
              <Link to="/our-story">Read the farm story</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
