"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  pathname,
  onClick,
  tone = "light",
  className,
}: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-sm font-medium transition-colors",
        tone === "dark"
          ? active
            ? "text-white"
            : "text-cream/80 hover:text-white"
          : active
            ? "text-ink"
            : "text-ink/70 hover:text-ink",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      <div className="relative z-50">
        <AnnouncementBar />
      </div>
      <header className="relative z-50 border-b border-line bg-white text-ink">
        <div className="relative mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-5 md:h-[4.5rem] md:px-8">
          <Link href="/" aria-label={`${site.brand} home`} className="relative z-10 shrink-0">
            <Logo priority />
          </Link>
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-x-6 whitespace-nowrap xl:flex"
            aria-label="Primary"
          >
            {nav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <NavLink key={item.href} {...item} pathname={pathname} className="whitespace-nowrap" />
              ))}
          </nav>
          <div className="relative z-10 flex shrink-0 items-center gap-2 lg:gap-2.5">
            <a href={site.phoneHref} className="inline-flex items-center gap-2.5">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#f2f1ed] md:size-11">
                <Phone className="size-4 text-[#e10600] md:size-5" aria-hidden />
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-[10px] font-semibold tracking-[0.14em] text-[#8a8f8c] uppercase">
                  24/7 Dispatch
                </span>
                <span className="block text-sm font-bold tracking-tight text-ink">413-539-7319</span>
              </span>
              <span className="sr-only sm:hidden">Call 413-539-7319</span>
            </a>
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md border border-line xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpenPath(open ? null : pathname)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-40 overflow-y-auto bg-ink pt-[7.25rem] text-cream md:pt-[7.75rem] xl:hidden"
        >
          <p id={titleId} className="sr-only">
            Site menu
          </p>
          <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                pathname={pathname}
                tone="dark"
                onClick={() => setOpenPath(null)}
                className="border-b border-white/10 py-4 text-2xl font-semibold tracking-tight"
              />
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export function HeaderFallback() {
  return (
    <div className="sticky top-0 z-50 bg-ink">
      <div className="h-12 bg-[#0b0b0b]" />
      <div className="h-16 border-b border-line bg-white md:h-[4.5rem]" />
    </div>
  );
}
