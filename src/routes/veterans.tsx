import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/utils";

export const Route = createFileRoute("/veterans")({ component: Veterans });

function Veterans() {
  return (
    <main>
      <section className="relative min-h-[50vh] overflow-hidden">
        <img
          src={assetPath("/images/veteran-packing.jpg")}
          alt="Packing pecan bags at Mill Creek Farms"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-honey">millcreekfarmga / a new chapter</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-paper sm:text-5xl">
            Learning the farm. Giving something back.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">A new kind of work</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The grove comes first. Trees, bees, a kitchen, a customer who
            should leave happier than they arrived. That is the job.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Some of us served in the Armed Forces and came looking for a way
            to keep being useful — learning harvest, packing, and how to send
            a good box. We are still learning it. That is the point of a farm.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Buy the pecans because they taste like Georgia. If it matters that
            veterans helped pack them, it is here. It does not need to be on
            every page.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link to="/shop">Shop the grove</Link>
            </Button>
          </div>
        </div>
        <img
          src={assetPath("/images/veteran-honey.jpg")}
          alt="Labeling jars of wildflower honey at the farm"
          className="rounded-xl object-cover shadow-[var(--shadow-border)]"
        />
      </section>
    </main>
  );
}
