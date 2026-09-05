import { getProduct } from "@/data/products";
import { newOrderId, PICKUP_ADDRESS, verifyUsAddress } from "./address";
import type { BuiltOrder, OrderInput, OrderLine } from "./order-schema";

export async function buildOrder(
  input: OrderInput,
): Promise<{ ok: true; order: BuiltOrder } | { ok: false; error: string }> {
  if (input.website && input.website.trim()) {
    return { ok: false, error: "silent" };
  }

  const lines: OrderLine[] = [];
  for (const row of input.lines) {
    const p = getProduct(row.slug);
    if (!p) return { ok: false, error: "A bag in the crate is no longer on the sheet." };
    lines.push({
      slug: p.slug,
      name: p.name,
      weight: p.weight,
      qty: row.qty,
      unit: p.retail,
      lineTotal: Math.round(p.retail * row.qty * 100) / 100,
    });
  }
  const total = Math.round(lines.reduce((s, l) => s + l.lineTotal, 0) * 100) / 100;

  let address = PICKUP_ADDRESS;
  if (input.fulfillment !== "pickup") {
    const checked = await verifyUsAddress({
      street: input.street ?? "",
      apt: input.apt,
      city: input.city ?? "",
      state: input.state ?? "",
      zip: input.zip ?? "",
    });
    if (!checked.ok) return checked;
    const apt = input.apt?.trim();
    address = {
      ...checked.matched,
      street: apt ? `${checked.matched.street}, ${apt}` : checked.matched.street,
      formatted: apt
        ? `${checked.matched.street}, ${apt}, ${checked.matched.city}, ${checked.matched.state} ${checked.matched.zip}`
        : checked.matched.formatted,
    };
  }

  return {
    ok: true,
    order: {
      id: newOrderId(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: (input.phone ?? "").replace(/\D/g, ""),
      fulfillment: input.fulfillment,
      payBy: input.payBy ?? "zelle",
      notes: (input.notes ?? "").trim(),
      address,
      lines,
      total,
      createdAt: new Date().toISOString(),
    },
  };
}
