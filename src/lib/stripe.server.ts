import Stripe from "stripe";
import { getRequest } from "@tanstack/react-start/server";

let cached: Stripe | null = null;
let cachedKey = "";

export function stripeSecret() {
  return (process.env.STRIPE_SECRET_KEY ?? "").trim();
}

export function stripeWebhookSecret() {
  return (process.env.STRIPE_WEBHOOK_SECRET ?? "").trim();
}

export function stripeReady() {
  return Boolean(stripeSecret());
}

export function stripeTestMode() {
  return stripeSecret().includes("_test_");
}

export function getStripe(): Stripe | null {
  const key = stripeSecret();
  if (!key) return null;
  if (!cached || cachedKey !== key) {
    cached = new Stripe(key);
    cachedKey = key;
  }
  return cached;
}

export function checkoutOrigin() {
  const fromEnv = (process.env.SITE_URL ?? "").trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const req = getRequest();
  const url = new URL(req.url);
  const proto = (req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "")).split(",")[0]!.trim();
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || url.host).split(",")[0]!.trim();
  return `${proto}://${host}`;
}

export function integrationId() {
  const suffix = Math.random().toString(36).slice(2, 10);
  return `millcreek-grove-${suffix}`;
}
