import { createFileRoute } from "@tanstack/react-router";
import { handleStripeWebhook } from "@/lib/orders.server";

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: ({ request }) => handleStripeWebhook(request),
    },
  },
});
