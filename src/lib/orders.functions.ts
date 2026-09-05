import { createServerFn } from "@tanstack/react-start";
import { addressInputSchema, orderInputSchema } from "./order-schema";
import { buildOrder, emailFarm, verifyUsAddress } from "./orders.server";

export const getPayConfig = createServerFn({ method: "GET" }).handler(async () => {
  return { inbox: "1volsfan89@gmail.com" };
});

export const verifyAddress = createServerFn({ method: "POST" })
  .validator(addressInputSchema)
  .handler(async ({ data }) => {
    return verifyUsAddress(data);
  });

export const placeOrder = createServerFn({ method: "POST" })
  .validator(orderInputSchema)
  .handler(async ({ data }) => {
    const built = await buildOrder(data);
    if (!built.ok) {
      if (built.error === "silent") {
        return { ok: true as const, orderId: "ok", payment: "invoice" as const, emailed: true as const };
      }
      return built;
    }
    const { order } = built;
    const mailed = await emailFarm(order, false);
    return {
      ok: true as const,
      orderId: order.id,
      payment: "invoice" as const,
      address: order.address.formatted,
      emailed: mailed.ok,
      activate: mailed.ok && "activate" in mailed ? mailed.activate : false,
      order,
    };
  });
