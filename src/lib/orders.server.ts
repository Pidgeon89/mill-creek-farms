import { getProduct } from "@/data/products";
import { newOrderId } from "./address";
import {
  FARM_INBOX,
  payMethodLabel,
  type BuiltOrder,
  type OrderLine,
} from "./order-schema";
import { checkoutOrigin, getStripe, integrationId } from "./stripe.server";
import type Stripe from "stripe";

export { stripeReady, stripeTestMode } from "./stripe.server";
export { verifyUsAddress } from "./address";
export { buildOrder } from "./build-order";

const emailedKeys = new Set<string>();

function orderEmailText(order: BuiltOrder, paid: boolean) {
  const items = order.lines
    .map((l) => `  • ${l.name} (${l.weight}) × ${l.qty}  —  $${l.lineTotal.toFixed(2)}`)
    .join("\n");
  const method = payMethodLabel(order.payBy);
  return [
    paid
      ? "PAID — pack this crate."
      : `SEND ${method.toUpperCase()} REQUEST — do not pack until it lands.`,
    "",
    `Reply to this email. Send ${order.name} a ${method} request for $${order.total.toFixed(2)}.`,
    order.payBy === "zelle"
      ? `Zelle to: ${order.email}${order.phone ? `  or  ${order.phone}` : ""}`
      : `Send the ${method} link to ${order.email}.`,
    "",
    `Order  ${order.id}`,
    `When   ${order.createdAt}`,
    "",
    `Name   ${order.name}`,
    `Email  ${order.email}`,
    order.phone ? `Phone  ${order.phone}` : null,
    `Pay    ${method}`,
    `How    ${order.fulfillment === "pickup" ? "Farm pickup" : "Ship"}`,
    `Addr   ${order.address.formatted}`,
    order.notes ? `Note   ${order.notes}` : null,
    "",
    "Crate",
    items,
    "",
    `Total  $${order.total.toFixed(2)}`,
    "",
    "Mill Creek Farms · Statesboro, Georgia",
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export async function emailFarm(order: BuiltOrder, paid: boolean) {
  const key = `${order.id}:${paid ? "paid" : "open"}`;
  if (emailedKeys.has(key)) return { ok: true as const, skipped: true };
  const method = payMethodLabel(order.payBy);
  const subject = paid
    ? `PAID order ${order.id} · ${order.name} · $${order.total.toFixed(2)}`
    : `SEND ${method.toUpperCase()} · ${order.id} · ${order.name} · $${order.total.toFixed(2)}`;
  const text = orderEmailText(order, paid);

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Mill Creek Farms <orders@millcreekfarmga.com>",
        to: [FARM_INBOX],
        reply_to: order.email,
        subject,
        text,
      }),
    });
    if (res.ok) {
      emailedKeys.add(key);
      return { ok: true as const };
    }
  }

  const res = await fetch(`https://formsubmit.co/ajax/${FARM_INBOX}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "box",
      _captcha: "false",
      _replyto: order.email,
      name: order.name,
      email: order.email,
      phone: order.phone || "(none)",
      order_id: order.id,
      status: paid ? "PAID" : `SEND ${payMethodLabel(order.payBy).toUpperCase()} REQUEST`,
      pay_by: payMethodLabel(order.payBy),
      fulfillment: order.fulfillment,
      address: order.address.formatted,
      crate: order.lines.map((l) => `${l.name} (${l.weight}) × ${l.qty} = $${l.lineTotal.toFixed(2)}`).join("\n"),
      total: `$${order.total.toFixed(2)}`,
      notes: order.notes || "(none)",
      placed: order.createdAt,
      message: text,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  const activated = json.success === true || json.success === "true" || /activated|confirm/i.test(json.message ?? "");
  if (res.ok || activated) {
    emailedKeys.add(key);
    return { ok: true as const, activate: /confirm|activate/i.test(json.message ?? "") };
  }
  return { ok: false as const, error: "The farm inbox did not accept this crate. Try again in a minute." };
}

export async function createStripeCheckout(order: BuiltOrder) {
  const stripe = getStripe();
  if (!stripe) return { ok: false as const, error: "Stripe is not connected." };

  const origin = checkoutOrigin();
  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        success_url: `${origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout`,
        customer_email: order.email,
        client_reference_id: order.id,
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        phone_number_collection: { enabled: !order.phone },
        submit_type: "pay",
        // Do not pass payment_method_types — Dashboard controls methods.
        line_items: order.lines.map((l) => ({
          quantity: l.qty,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(l.unit * 100),
            product_data: {
              name: `${l.name} · ${l.weight}`,
              metadata: { slug: l.slug },
            },
          },
        })),
        metadata: {
          order_id: order.id,
          name: order.name.slice(0, 400),
          email: order.email,
          phone: order.phone.slice(0, 40),
          fulfillment: order.fulfillment,
          address: order.address.formatted.slice(0, 500),
          notes: order.notes.slice(0, 400),
          items: order.lines
            .map((l) => `${l.slug}x${l.qty}`)
            .join(",")
            .slice(0, 500),
          total: String(order.total),
        },
        payment_intent_data: {
          description: `Mill Creek Farms ${order.id}`,
          metadata: { order_id: order.id },
        },
        custom_text: {
          submit: {
            message:
              order.fulfillment === "pickup"
                ? "We'll pack it for pickup at 1892 Mill Creek Rd, Statesboro."
                : `Ships to ${order.address.formatted}.`,
          },
        },
        integration_identifier: integrationId(),
      },
      { idempotencyKey: `mcf-checkout-${order.id}` },
    );
    if (!session.url) return { ok: false as const, error: "Stripe did not return a checkout URL." };
    return { ok: true as const, url: session.url, sessionId: session.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe could not start checkout.";
    return { ok: false as const, error: message };
  }
}

export function orderFromStripeSession(session: {
  payment_status?: string | null;
  amount_total?: number | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null; phone?: string | null } | null;
  metadata?: Record<string, string> | null;
  client_reference_id?: string | null;
}): BuiltOrder {
  const meta = session.metadata ?? {};
  const items = (meta.items ?? "")
    .split(",")
    .filter(Boolean)
    .map((pair) => {
      const [slug, qty] = pair.split("x");
      const p = slug ? getProduct(slug) : undefined;
      const n = Number(qty) || 1;
      if (!p) return null;
      return {
        slug: p.slug,
        name: p.name,
        weight: p.weight,
        qty: n,
        unit: p.retail,
        lineTotal: Math.round(p.retail * n * 100) / 100,
      };
    })
    .filter((x): x is OrderLine => Boolean(x));

  const formatted = meta.address || "Address on the Stripe receipt";
  return {
    id: meta.order_id || session.client_reference_id || newOrderId(),
    name: meta.name || "Customer",
    email: meta.email || session.customer_email || session.customer_details?.email || "",
    phone: meta.phone || session.customer_details?.phone || "",
    fulfillment: meta.fulfillment === "pickup" ? "pickup" : "ship",
    payBy: (meta.payBy === "cashapp" || meta.payBy === "venmo" ? meta.payBy : "zelle") as BuiltOrder["payBy"],
    notes: meta.notes || "",
    address: {
      street: formatted,
      city: "",
      state: "",
      zip: "",
      formatted,
    },
    lines: items,
    total: (session.amount_total ?? 0) / 100,
    createdAt: new Date().toISOString(),
  };
}

export async function fulfillPaidSession(session: {
  payment_status?: string | null;
  amount_total?: number | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null; phone?: string | null } | null;
  metadata?: Record<string, string> | null;
  client_reference_id?: string | null;
}) {
  if (session.payment_status === "unpaid") {
    return { ok: false as const, error: "Payment is not marked paid yet." };
  }
  const order = orderFromStripeSession(session);
  const mailed = await emailFarm(order, true);
  return {
    ok: true as const,
    order,
    emailed: mailed.ok,
    activate: mailed.ok && "activate" in mailed ? mailed.activate : false,
  };
}

export async function confirmStripeSession(sessionId: string) {
  const stripe = getStripe();
  if (!stripe) return { ok: false as const, error: "Stripe is not connected." };
  if (!/^cs_[a-zA-Z0-9]+/.test(sessionId)) {
    return { ok: false as const, error: "That payment session does not look right." };
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    return { ok: false as const, error: "Payment is not marked paid yet." };
  }
  return fulfillPaidSession(session);
}

export async function handleStripeWebhook(request: Request) {
  const stripe = getStripe();
  const secret = (process.env.STRIPE_WEBHOOK_SECRET ?? "").trim();
  if (!stripe || !secret) {
    return new Response("Stripe webhook is not configured.", { status: 503 });
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing stripe-signature.", { status: 400 });
  const raw = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch {
    return new Response("Invalid signature.", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== "unpaid") {
      await fulfillPaidSession(session);
    }
  }

  return Response.json({ received: true });
}

