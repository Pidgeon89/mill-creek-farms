import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { getProduct } from "@/data/products";
import { cartTotal, useCart } from "@/lib/cart";
import { money } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({ component: Checkout });

function Checkout() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const total = cartTotal(lines);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-4xl">The crate is spoken for.</h1>
        <p className="mt-4 text-muted">
          Thank you{name ? `, ${name}` : ""}. This preview shop records the order
          on this device so you can see the flow. When we open live payments,
          a person on the packing table will actually weigh the bag.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link to="/shop">Back to the grove</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!lines.length) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-3xl">Nothing in the crate yet.</h1>
        <div className="mt-6">
          <Button asChild>
            <Link to="/shop">Shop</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setDone(true);
          toast.success("Order noted. Thank you for feeding the grove.");
          void navigate({ to: "/checkout" });
        }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">millcreekfarmga / checkout</p>
        <h1 className="font-display text-4xl">Where should it land?</h1>
        <label className="block text-sm">
          Name
          <Input className="mt-1.5" required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block text-sm">
          Email
          <Input className="mt-1.5" type="email" required />
        </label>
        <label className="block text-sm">
          Ship to
          <Textarea className="mt-1.5" required placeholder="Street, city, state, ZIP" />
        </label>
        <p className="text-xs text-muted">
          Card processing is not live on this first pass. Place the order to
          walk the path; we will wire payments when you say go.
        </p>
        <Button type="submit" className="w-full" size="lg">
          Place order · {money(total)}
        </Button>
      </form>
      <aside className="rounded-xl bg-cream/50 p-6 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-2xl">In this crate</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <li key={l.slug} className="flex justify-between gap-3">
                <span>
                  {p.name} × {l.qty}
                </span>
                <span className="tabular-nums">{money(p.retail * l.qty)}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 flex justify-between font-medium">
          <span>Total</span>
          <span className="tabular-nums">{money(total)}</span>
        </p>
      </aside>
    </main>
  );
}
