import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { getProduct } from "@/data/products";
import { cartTotal, useCart } from "@/lib/cart";
import { placeOrder } from "@/lib/orders.functions";
import { PAY_METHODS, US_STATES, payMethodLabel, type PayMethod } from "@/lib/order-schema";
import { sendOrderEmailFromBrowser } from "@/lib/send-order-email";
import { verifyUsAddress } from "@/lib/address";
import { buildOrder } from "@/lib/build-order";
import { cn, money } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

const fieldClass =
  "mt-1.5 h-11 w-full rounded-md bg-paper px-3.5 font-sans text-sm text-ink shadow-[var(--shadow-border)] placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Checkout() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const total = cartTotal(lines);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"ship" | "pickup">("ship");
  const [payBy, setPayBy] = useState<PayMethod>("zelle");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("GA");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [matched, setMatched] = useState("");
  const [done, setDone] = useState<{
    orderId: string;
    address: string;
    name: string;
    email: string;
    payBy: PayMethod;
    total: number;
    activate?: boolean;
  } | null>(null);

  const canCheck = useMemo(
    () => fulfillment === "ship" && street.length > 4 && city.length > 1 && zip.replace(/\D/g, "").length === 5,
    [fulfillment, street, city, zip],
  );

  async function checkStreet() {
    if (!canCheck) return;
    setError("");
    const res = await verifyUsAddress({ street, apt, city, state, zip });
    if (res.ok) {
      setStreet(res.matched.street);
      setCity(res.matched.city);
      setState(res.matched.state);
      setZip(res.matched.zip);
      setMatched(res.matched.formatted);
    } else {
      setMatched("");
      setError(res.error);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const payload = {
        name,
        email,
        phone,
        fulfillment,
        payBy,
        notes,
        website,
        lines: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
        street,
        apt,
        city,
        state,
        zip,
      };
      let res: Awaited<ReturnType<typeof placeOrder>> | null = null;
      try {
        res = await placeOrder({ data: payload });
      } catch {
        res = null;
      }
      if (res && "error" in res && res.error === "silent") {
        clear();
        setDone({ orderId: "ok", address: "", name, email, payBy, total });
        return;
      }
      if (!res || !res.ok) {
        const built = await buildOrder(payload);
        if (!built.ok) {
          if (built.error === "silent") {
            clear();
            setDone({ orderId: "ok", address: "", name, email, payBy, total });
            return;
          }
          setError(built.error);
          return;
        }
        const mailed = await sendOrderEmailFromBrowser(built.order, false);
        if (!mailed.ok) {
          setError(mailed.error ?? "The farm inbox did not accept this crate. Try again in a minute.");
          return;
        }
        clear();
        setDone({
          orderId: built.order.id,
          address: built.order.address.formatted,
          name,
          email: built.order.email,
          payBy: built.order.payBy,
          total: built.order.total,
          activate: mailed.activate,
        });
        toast.success("Order is in the farm inbox.");
        return;
      }
      if (res.payment === "invoice" && !("order" in res)) {
        clear();
        setDone({ orderId: res.orderId, address: "", name, email, payBy, total });
        return;
      }
      const order = "order" in res ? res.order : undefined;
      if (!order) {
        setError("The crate could not be written down. Try again.");
        return;
      }
      if (!res.emailed) {
        const mailed = await sendOrderEmailFromBrowser(order, false);
        if (!mailed.ok) {
          setError(mailed.error ?? "The farm inbox did not accept this crate. Try again in a minute.");
          return;
        }
      }
      clear();
      setDone({
        orderId: res.orderId,
        address: order.address.formatted,
        name,
        email: order.email,
        payBy: order.payBy,
        total: order.total,
        activate: res.activate,
      });
      toast.success("Order is in the farm inbox.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place the order.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    const method = payMethodLabel(done.payBy);
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-honey">order {done.orderId}</p>
        <h1 className="mt-3 font-display text-4xl">The crate is on the list.</h1>
        <p className="mt-4 text-muted">
          Thank you{done.name ? `, ${done.name}` : ""}. We have the order. Next we reply to{" "}
          <span className="text-ink">{done.email || "this email"}</span> with a {method} request for{" "}
          <span className="text-ink">{money(done.total)}</span>. Nothing ships — and nothing gets packed for
          pickup — until that lands.
        </p>
        {done.activate ? (
          <p className="mt-3 text-sm text-honey">
            First crate of the day: check 1volsfan89@gmail.com and click Confirm so later orders come through
            on their own.
          </p>
        ) : null}
        {done.address ? (
          <p className="mt-4 rounded-xl bg-cream/50 px-4 py-3 text-sm text-ink shadow-[var(--shadow-border)]">
            {done.address}
          </p>
        ) : null}
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
      <form className="space-y-4" onSubmit={(e) => void onSubmit(e)}>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">millcreekfarmga / checkout</p>
        <h1 className="font-display text-4xl">Where should it land?</h1>

        <label className="block text-sm">
          Name
          <Input className="mt-1.5" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block text-sm">
          Email
          <Input
            className="mt-1.5"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Phone {payBy === "zelle" ? <span className="text-muted">(helps for Zelle)</span> : <span className="text-muted">(optional)</span>}
          <Input
            className="mt-1.5"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <fieldset>
          <legend className="mb-1.5 text-sm">How you want to pay</legend>
          <div className="grid grid-cols-3 gap-2">
            {PAY_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPayBy(m.id)}
                className={cn(
                  "h-11 rounded-md text-sm shadow-[var(--shadow-border)]",
                  payBy === m.id ? "bg-bark text-paper" : "bg-paper text-ink hover:bg-cream",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Place the crate first. We email you a {payMethodLabel(payBy)} request for {money(total)}. We do
            not pack until it clears.
          </p>
        </fieldset>

        <fieldset className="grid grid-cols-2 gap-2">
          <legend className="mb-1.5 text-sm">How it gets there</legend>
          {(
            [
              ["ship", "Ship it"],
              ["pickup", "Pick up in Statesboro"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setFulfillment(value);
                setMatched("");
                setError("");
              }}
              className={cn(
                "h-11 rounded-md text-sm shadow-[var(--shadow-border)]",
                fulfillment === value ? "bg-bark text-paper" : "bg-paper text-ink hover:bg-cream",
              )}
            >
              {label}
            </button>
          ))}
        </fieldset>

        {fulfillment === "ship" ? (
          <div className="space-y-4 rounded-xl bg-cream/40 p-4 shadow-[var(--shadow-border)]">
            <p className="text-sm text-muted">
              Full U.S. street — number, city, state, ZIP. We check it against the national address file before
              the crate is spoken for.
            </p>
            <label className="block text-sm">
              Street
              <Input
                className="mt-1.5"
                required
                autoComplete="address-line1"
                placeholder="1892 Mill Creek Rd"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  setMatched("");
                }}
                onBlur={() => void checkStreet()}
              />
            </label>
            <label className="block text-sm">
              Apt / suite <span className="text-muted">(optional)</span>
              <Input
                className="mt-1.5"
                autoComplete="address-line2"
                value={apt}
                onChange={(e) => setApt(e.target.value)}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-[1fr_5.5rem_7rem]">
              <label className="block text-sm">
                City
                <Input
                  className="mt-1.5"
                  required
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setMatched("");
                  }}
                  onBlur={() => void checkStreet()}
                />
              </label>
              <label className="block text-sm">
                State
                <select
                  className={fieldClass}
                  required
                  autoComplete="address-level1"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setMatched("");
                  }}
                >
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.code}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                ZIP
                <Input
                  className="mt-1.5"
                  required
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={10}
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                    setMatched("");
                  }}
                  onBlur={() => void checkStreet()}
                />
              </label>
            </div>
            {matched ? <p className="text-sm text-leaf">Verified street · {matched}</p> : null}
          </div>
        ) : (
          <p className="rounded-xl bg-cream/40 px-4 py-3 text-sm text-muted shadow-[var(--shadow-border)]">
            Pickup at the farm, 1892 Mill Creek Rd, Statesboro. Mon–Fri 8–5, Sat 8–1.
          </p>
        )}

        <label className="block text-sm">
          Note for the packing table <span className="text-muted">(optional)</span>
          <Textarea
            className="mt-1.5 min-h-24"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Gate code, leave at the porch, gift card wording…"
          />
        </label>

        <div aria-hidden className="hidden">
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        {error ? <p className="text-sm text-pecan">{error}</p> : null}

        <p className="text-xs text-muted">
          This crate emails 1volsfan89@gmail.com as soon as you place it. Reply to that mail with a{" "}
          {payMethodLabel(payBy)} request — we do not take cards on this page. The first order of the day may
          ask the farm inbox to click Confirm, once.
        </p>

        <Button type="submit" className="w-full" size="lg" disabled={busy}>
          {busy ? "Checking the street…" : `Place crate · ${money(total)}`}
        </Button>
      </form>

      <aside className="h-fit rounded-xl bg-cream/50 p-6 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-2xl">In this crate</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <li key={l.slug} className="flex justify-between gap-3">
                <span>
                  {p.name} · {p.weight} × {l.qty}
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
        <p className="mt-3 text-xs text-muted">
          Pay by {payMethodLabel(payBy)} after we send the request. Shipping billed at actual after we pack, or
          skip it and pick up on Mill Creek Road.
        </p>
      </aside>
    </main>
  );
}
