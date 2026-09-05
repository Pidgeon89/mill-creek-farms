import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Layout } from "@/components/site/Layout";
import appCss from "../styles.css?url";

const APP_NAME = "Mill Creek Farms";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Georgia pecans and raw wildflower honey from Mill Creek Farms in Statesboro. A family grove, a farm kitchen, and a good box from Georgia.",
      },
      { name: "theme-color", content: "#2C1810" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/images/logo-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Layout>
            <Outlet />
          </Layout>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "font-sans text-sm",
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
