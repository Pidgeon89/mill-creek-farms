import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
