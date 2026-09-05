import { FARM_INBOX, payMethodLabel, type BuiltOrder } from "./order-schema";

export async function sendOrderEmailFromBrowser(order: BuiltOrder, paid: boolean) {
  const method = payMethodLabel(order.payBy);
  const subject = paid
    ? `PAID order ${order.id} · ${order.name} · $${order.total.toFixed(2)}`
    : `SEND ${method.toUpperCase()} · ${order.id} · ${order.name} · $${order.total.toFixed(2)}`;
  const crate = order.lines
    .map((l) => `${l.name} (${l.weight}) × ${l.qty} = $${l.lineTotal.toFixed(2)}`)
    .join("\n");
  const message = [
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
    `Name   ${order.name}`,
    `Email  ${order.email}`,
    order.phone ? `Phone  ${order.phone}` : null,
    `Pay    ${method}`,
    `How    ${order.fulfillment === "pickup" ? "Farm pickup" : "Ship"}`,
    `Addr   ${order.address.formatted}`,
    order.notes ? `Note   ${order.notes}` : null,
    "",
    "Crate",
    crate,
    "",
    `Total  $${order.total.toFixed(2)}`,
  ]
    .filter((x) => x !== null)
    .join("\n");

  const res = await fetch(`https://formsubmit.co/ajax/${FARM_INBOX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: subject,
      _template: "box",
      _captcha: "false",
      _replyto: order.email,
      name: order.name,
      email: order.email,
      phone: order.phone || "(none)",
      order_id: order.id,
      status: paid ? "PAID" : `SEND ${method.toUpperCase()} REQUEST`,
      pay_by: method,
      fulfillment: order.fulfillment,
      address: order.address.formatted,
      crate,
      total: `$${order.total.toFixed(2)}`,
      notes: order.notes || "(none)",
      placed: order.createdAt,
      message,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  const ok = res.ok || json.success === true || json.success === "true";
  return {
    ok,
    activate: /confirm|activate/i.test(json.message ?? ""),
    error: ok ? undefined : (json.message ?? "The farm inbox did not accept this crate."),
  };
}
