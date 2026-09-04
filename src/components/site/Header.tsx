import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cartCount, useCart } from "@/lib/cart";

const links = [
  { to: "/georgia-pecans", label: "Georgia pecans" },
  { to: "/honey", label: "Honey" },
  { to: "/shop", label: "Shop" },
  { to: "/true-cost", label: "Fair price" },
  { to: "/our-story", label: "The farm" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const count = cartCount(useCart((s) => s.lines));
  useEffect(() => setReady(true), []);
  const shown = ready ? count : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-md bg-bark text-paper">
            <PecanMark />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-semibold tracking-tight text-ink">
              Mill Creek Farms
            </span>
            <span className="block font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
              Statesboro, Georgia
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-sans text-[13px] font-medium text-muted transition-colors duration-[var(--motion-quick)] hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/cart"
            className="relative grid size-11 place-items-center rounded-md text-ink hover:bg-cream"
            aria-label={`Cart, ${shown} items`}
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.75} />
            {shown > 0 ? (
              <span className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-honey px-1 font-sans text-[10px] font-semibold text-ink tabular-nums">
                {shown}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-ink hover:bg-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-paper px-4 py-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block py-3 font-sans text-base text-ink"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function PecanMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M12 3c2.4 1.2 6 4.2 6 8.2 0 4.4-2.7 8.4-6 10.3C8.7 19.6 6 15.6 6 11.2 6 7.2 9.6 4.2 12 3Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M12 5.2v15" stroke="#FBF7F0" strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}
