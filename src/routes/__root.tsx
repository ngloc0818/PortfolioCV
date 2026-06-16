import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center sticker p-8">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Hông tìm thấy trang này 🥲</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Có vẻ con robot bị lạc rồi. Quay về nhà thôi!
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-mono text-primary-foreground hover:opacity-90"
          >
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center sticker p-8">
        <h1 className="text-xl font-semibold">Mạch bị chập rồi ⚡</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Trang này chưa load được. Thử lại nha.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-mono text-primary-foreground hover:opacity-90"
          >
            Thử lại
          </button>
          <a
            href="/"
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-mono hover:bg-pastel-beige"
          >
            Về nhà
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
      { title: "Nguyễn Phúc Lộc — Portfolio CV" },
      {
        name: "description",
        content:
          "Portfolio của Nguyễn Phúc Lộc — sinh viên Công nghệ Kỹ thuật Điện tử-Viễn thông, mê hệ thống nhúng và IoT.",
      },
      { name: "author", content: "Nguyễn Phúc Lộc" },
      { property: "og:title", content: "Nguyễn Phúc Lộc — Portfolio CV" },
      {
        property: "og:description",
        content: "Sinh viên năm 4, tò mò với mọi thứ về nhúng và IoT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Nguyễn Phúc Lộc — Portfolio CV" },
      { name: "description", content: "Lộc's IoT Lab is a personal portfolio website showcasing embedded systems and IoT projects." },
      { property: "og:description", content: "Lộc's IoT Lab is a personal portfolio website showcasing embedded systems and IoT projects." },
      { name: "twitter:description", content: "Lộc's IoT Lab is a personal portfolio website showcasing embedded systems and IoT projects." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/31b96ada-66b2-42eb-9bf8-5d431c5e2f1b/id-preview-1a80c5ea--fe9ead4b-7251-4a5e-b6cc-1e0db841b2ef.lovable.app-1781582735840.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/31b96ada-66b2-42eb-9bf8-5d431c5e2f1b/id-preview-1a80c5ea--fe9ead4b-7251-4a5e-b6cc-1e0db841b2ef.lovable.app-1781582735840.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
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
