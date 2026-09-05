import { Link } from "@tanstack/react-router";
import { assetPath } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-bark text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={assetPath("/images/logo.png")}
              alt=""
              className="size-14 rounded-full object-cover"
            />
            <p className="font-display text-2xl">Mill Creek Farms</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">
            Georgia pecans and raw wildflower honey from a family orchard in
            Statesboro. Grown here, packed here, sent like we still live here.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-honey">Visit</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">
            1892 Mill Creek Rd
            <br />
            Statesboro, GA 30461
            <br />
            Mon–Fri 8–5 · Sat 8–1
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-honey">The grove</p>
          <Link to="/shop" className="text-cream/80 hover:text-paper">
            Shop
          </Link>
          <Link to="/true-cost" className="text-cream/80 hover:text-paper">
            Fair price
          </Link>
          <Link to="/our-story" className="text-cream/80 hover:text-paper">
            The farm
          </Link>
          <Link to="/veterans" className="text-cream/80 hover:text-paper">
            A new chapter
          </Link>
          <Link to="/contact" className="text-cream/80 hover:text-paper">
            Visit & wholesale
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 font-sans text-xs text-cream/55 sm:px-6">
          millcreekfarmga · Grown in Georgia. Sent from the farm.
        </p>
      </div>
    </footer>
  );
}
