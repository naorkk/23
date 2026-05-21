import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LEGENDARY KITS — חולצות כדורגל וגופיות NBA פרימיום" },
      { name: "description", content: "LEGENDARY KITS — חולצות כדורגל וגופיות NBA רשמיות ברמת גימור פרימיום. מבצע השקה: 70 ₪ ל-5 הראשונים. משלוח מהיר בישראל." },
      { name: "author", content: "LEGENDARY KITS" },
      { property: "og:title", content: "LEGENDARY KITS — חולצות כדורגל וגופיות NBA פרימיום" },
      { property: "og:description", content: "LEGENDARY KITS — חולצות כדורגל וגופיות NBA רשמיות ברמת גימור פרימיום. מבצע השקה: 70 ₪ ל-5 הראשונים. משלוח מהיר בישראל." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@LegendaryKits" },
      { name: "twitter:title", content: "LEGENDARY KITS — חולצות כדורגל וגופיות NBA פרימיום" },
      { name: "twitter:description", content: "LEGENDARY KITS — חולצות כדורגל וגופיות NBA רשמיות ברמת גימור פרימיום. מבצע השקה: 70 ₪ ל-5 הראשונים. משלוח מהיר בישראל." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f0c7e305-0bf4-42db-8859-d9800ff9440d/id-preview-5c2d64c4--3f31d11a-ba21-40f5-8908-26bcd7e42735.lovable.app-1779285915083.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f0c7e305-0bf4-42db-8859-d9800ff9440d/id-preview-5c2d64c4--3f31d11a-ba21-40f5-8908-26bcd7e42735.lovable.app-1779285915083.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
