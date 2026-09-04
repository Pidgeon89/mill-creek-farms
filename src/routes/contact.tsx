import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">millcreekfarmga / contact</p>
      <h1 className="mt-3 font-display text-4xl">Wholesale, pickup, or a straight question</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Stores, kitchens, and churches: ask for the wholesale sheet. Farm pickup
        in Statesboro, Mon–Fri 8–5, Sat 8–1. 1892 Mill Creek Rd.
      </p>
      {sent ? (
        <p className="mt-10 rounded-xl bg-cream/50 p-6 shadow-[var(--shadow-border)]">
          Noted. A person — not a bot — will read this when we go live.
        </p>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message saved on this preview.");
          }}
        >
          <label className="block text-sm">
            Name
            <Input className="mt-1.5" required />
          </label>
          <label className="block text-sm">
            Email
            <Input className="mt-1.5" type="email" required />
          </label>
          <label className="block text-sm">
            What do you need?
          <Textarea className="mt-1.5" required placeholder="Wholesale case, gift crates, farm pickup…" />
          </label>
          <Button type="submit">Send</Button>
        </form>
      )}
    </main>
  );
}
