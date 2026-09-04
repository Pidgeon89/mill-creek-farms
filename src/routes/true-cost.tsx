import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/true-cost")({ component: TrueCost });

function TrueCost() {
  return (
    <main>
      <section className="relative min-h-[46vh] overflow-hidden">
        <img
          src="/images/orchard-hero.jpg"
          alt="Pecan orchard at Mill Creek Farms"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-honey">
            millcreekfarmga / true-cost
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-paper sm:text-5xl">
            A fair bag. Not a mystery bag.
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="font-display text-2xl leading-snug text-pecan">
          We do not show you a spreadsheet. We grow the pecans, pack them here,
          and charge what it takes to do that again next year.
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted">
          A pecan tree is a long bet. Land, well water, weather, and a humid
          Georgia summer all sit inside the bag before anyone ever tastes it.
          Shelling takes more than the nut you see. People at the packing
          table weigh, inspect, and send it on.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Grocery pecans often cost more after they have traveled, and still
          tell you less. Direct from this grove, the price is meant to keep the
          orchard in pecans and the crew in work. It is not a get-rich story.
        </p>
      </article>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-8 sm:px-6 md:grid-cols-3">
        {[
          {
            title: "The grove",
            body: "Trees, land, water, and a crop that can vanish in a storm. That is the first cost. It does not show up as a line on the bag. It is the bag.",
          },
          {
            title: "The table",
            body: "Cracking, sorting, roasting, jarring. Hands in the kitchen sending Georgia food out the door.",
          },
          {
            title: "Your door",
            body: "What you pay here stays close to the farm. Enough to keep going. Not a fortune hiding in the hull.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-xl bg-cream/50 p-6 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-xl bg-bark p-8 text-paper sm:p-10">
          <h2 className="font-display text-3xl">Priced to keep the work honest</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80">
            If a year is kind, it goes back into trees and people. If a year is
            hard, the well still has to run. Buy because it tastes like Georgia
            and the price feels fair — not because we asked you to fund a second
            life.
          </p>
          <div className="mt-8">
            <Button asChild variant="invert">
              <Link to="/shop">Shop the grove</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
