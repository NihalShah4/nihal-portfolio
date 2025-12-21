"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    // highlight exact, and for nested routes like /blog/slug
    const match = navItems.find((i) => pathname === i.href);
    if (match) return match.href;

    const parent = navItems.find((i) => i.href !== "/" && pathname?.startsWith(i.href));
    return parent?.href ?? "/";
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: "rgb(var(--border))",
        background: "rgba(var(--bg), 0.75)",
      }}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Nihal Shah
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  isActive ? "font-medium" : "opacity-80 hover:opacity-100"
                }`}
                style={{
                  background: isActive ? "rgba(var(--primary), 0.12)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border p-2 transition hover:opacity-90"
            style={{ borderColor: "rgb(var(--border))" }}
            aria-label="Toggle menu"
            title="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          <div className="container-page py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    isActive ? "font-medium" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    background: isActive ? "rgba(var(--primary), 0.12)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
