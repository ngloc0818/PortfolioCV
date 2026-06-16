import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Giới thiệu" },
  { to: "/projects", label: "Dự án" },
  { to: "/resume", label: "Kinh nghiệm" },
  { to: "/contact", label: "Liên hệ" },
] as const;

export function SiteLayout({ children }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/70 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-pastel-green border-[1.5px] border-foreground font-mono font-bold">
              NL
            </span>
            <span className="truncate font-mono font-bold text-sm sm:text-base">
              NguyenPhucLoc
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            {nav.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "hover:bg-pastel-beige"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12">
        {children ?? <Outlet />}
      </main>

      <footer className="border-t border-border bg-paper/60">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
          <span>© {new Date().getFullYear()} Nguyễn Phúc Lộc · made with ☕ & solder</span>
          <span>v0.1 — beep boop 🤖</span>
        </div>
      </footer>
    </div>
  );
}
