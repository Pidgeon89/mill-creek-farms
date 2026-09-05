import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { FARM_INBOX } from "@/lib/order-schema";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website.trim()) {
      setSent(true);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FARM_INBOX}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Farm note · ${name}`,
          _template: "box",
          _captcha: "false",
          _replyto: email,
          name,
          email,
          message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      const ok = res.ok || json.success === true || json.success === "true";
      if (!ok) {
        setError("Could not reach the farm inbox. Email 1volsfan89@gmail.com directly.");
        return;
      }
      setSent(true);
      toast.success("Sent to the farm.");
    } catch {
      setError("Could not reach the farm inbox. Email 1volsfan89@gmail.com directly.");
    } finally {
      setBusy(false);
    }
  }

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
          Noted. It went to the farm inbox. If this is the first note of the day, we may have to click Confirm
          in Gmail once.
        </p>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={(e) => void onSubmit(e)}>
          <label className="block text-sm">
            Name
            <Input className="mt-1.5" required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block text-sm">
            Email
            <Input className="mt-1.5" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block text-sm">
            What do you need?
            <Textarea
              className="mt-1.5"
              required
              placeholder="Wholesale case, gift crates, farm pickup…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <div aria-hidden className="hidden">
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          {error ? <p className="text-sm text-pecan">{error}</p> : null}
          <Button type="submit" disabled={busy}>
            {busy ? "Sending…" : "Send"}
          </Button>
        </form>
      )}
    </main>
  );
}
