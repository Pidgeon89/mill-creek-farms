import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/products";
import { cartTotal, useCart } from "@/lib/cart";
import { money } from "@/lib/utils";

export const Route = createFileRoute("/cart")({ component: Cart });

function Cart() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = cartTotal(lines);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">millcreekfarmga / cart</p>
      <h1 className="mt-3 font-display text-4xl">Your crate</h1>
      {lines.length === 0 ? (
        <div className="mt-10 rounded-xl bg-cream/50 p-10 text-center shadow-[var(--shadow-border)]">
          <p className="text-muted">The crate is empty. The grove is not.</p>
          <div className="mt-6">
            <Button asChild>
              <Link to="/shop">Shop pecans & honey</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <div key={l.slug} className="flex gap-4 rounded-xl bg-cream/40 p-3 shadow-[var(--shadow-border)]">
                <img src={p.image} alt="" className="size-20 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">{p.name}</p>
                  <p className="text-xs text-muted">{p.weight}</p>
                  <p className="mt-1 text-sm tabular-nums">{money(p.retail)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="grid size-10 place-items-center rounded-md hover:bg-cream"
                      aria-label="Decrease"
                      onClick={() => setQty(l.slug, l.qty - 1)}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-6 text-center tabular-nums">{l.qty}</span>
                    <button
                      type="button"
                      className="grid size-10 place-items-center rounded-md hover:bg-cream"
                      aria-label="Increase"
                      onClick={() => setQty(l.slug, l.qty + 1)}
                    >
                      <Plus className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="ml-auto grid size-10 place-items-center rounded-md text-muted hover:bg-cream hover:text-ink"
                      aria-label="Remove"
                      onClick={() => remove(l.slug)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="rounded-xl bg-bark p-6 text-paper">
            <div className="flex justify-between font-display text-2xl">
              <span>Total</span>
              <span className="tabular-nums">{money(total)}</span>
            </div>
            <p className="mt-2 text-xs text-cream/65">
              Grown here. Packed here. Priced to keep the grove going.
            </p>
            <Button asChild variant="invert" className="mt-6 w-full">
              <Link to="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
