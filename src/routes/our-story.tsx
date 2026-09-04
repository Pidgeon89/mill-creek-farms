import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/our-story")({ component: Story });

function Story() {
  return (
    <main>
      <section className="relative min-h-[50vh] overflow-hidden">
        <img src="/images/farm-porch.jpg" alt="Mill Creek Farms porch with pecans and honey" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-honey">millcreekfarmga / our-story</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-paper sm:text-5xl">
            A family orchard on Mill Creek.
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="font-display text-2xl leading-snug text-pecan">
          Farming has been in the Anderson family for three generations in
          Statesboro. The trees were a long bet. The kitchen, the bees, and
          the people learning this work are how we keep it going.
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted">
          Leslie planted pecan trees in 2003 — first in blocks around the shop,
          then out into the fields. Harvest started in 2010. In 2018 Hunter
          stood up a cottage-food kitchen so the farm could roast, candy, and
          pack instead of selling every nut into a bin that forgets the farmer’s
          name.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          A pecan tree takes the better part of a decade to pay. A hive can fail
          in a winter. A hurricane can take a year. We like people to know that
          — not as a lecture, as the reason a bag from here tastes the way it
          does. Come by the porch. Ask about the varieties. Leave with something
          that still remembers the grove.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Some of us came here after the Army, learning the orchard and the
          kitchen as a new way to give back. The farm is the work. The rest
          shows up when it should.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/shop">Shop the grove</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/georgia-pecans">Learn the pecans</Link>
          </Button>
        </div>
      </article>
    </main>
  );
}
