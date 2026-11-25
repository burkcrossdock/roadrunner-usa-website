"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { AnnouncementBar } from "@/components/announcement-bar";
import { DeskStatus } from "@/components/desk-status";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  pathname,
  onClick,
  className,
}: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
  className?: string;
}) {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-sm font-medium text-cream/75 transition-colors hover:text-cream",
        active && "text-cream",
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
      <div className="relative z-50 bg-ink text-cream">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-2 text-[12px] md:px-8">
          <p className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-cream/80">
            <DeskStatus />
            <span className="hidden text-cream/30 sm:inline" aria-hidden>
              ·
            </span>
            <span className="hidden sm:inline">Mon–Fri 7 AM–11 PM EST</span>
            <span className="hidden text-cream/30 md:inline" aria-hidden>
              ·
            </span>
            <span className="hidden md:inline">Sat 9:30 AM–4 PM EST</span>
          </p>
          <p className="flex shrink-0 items-center gap-4">
            <a className="font-semibold hover:text-white" href={site.phoneHref}>
              {site.phone}
            </a>
            <a className="hidden hover:text-white lg:inline" href={site.emailHref}>
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <header className="relative z-50 border-b border-white/10 bg-ink text-cream">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
          <Link href="/" aria-label={`${site.brand} home`}>
            <Logo priority />
          </Link>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
            {nav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <NavLink key={item.href} {...item} pathname={pathname} />
              ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/careers"
              className={buttonVariants({
                variant: "outline",
                className:
                  "h-10 border-white/20 bg-transparent px-4 text-cream hover:bg-white hover:text-ink",
              })}
            >
              Apply
            </Link>
            <Link
              href="/quote"
              className={buttonVariants({
                className: "h-10 px-4 font-semibold",
              })}
            >
              Get a Quote
            </Link>
          </div>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open ? (
        <div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-40 overflow-y-auto bg-ink pt-[8.85rem] text-cream md:pt-[9.4rem] xl:hidden"
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
                onClick={() => setOpenPath(null)}
                className="border-b border-white/10 py-4 text-2xl font-semibold tracking-tight text-cream"
              />
            ))}
          </nav>
          <div className="grid gap-3 px-5 pb-10">
            <Link
              href="/quote"
              className={buttonVariants({ className: "h-12 text-base" })}
            >
              Get a Quote
            </Link>
            <Link
              href="/careers"
              className={buttonVariants({
                variant: "outline",
                className: "h-12 border-white/20 bg-transparent text-base text-cream",
              })}
            >
              Apply to drive
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function HeaderFallback() {
  return (
    <div className="sticky top-0 z-50 bg-ink">
      <div className="h-10 bg-[#0b0b0b]" />
      <div className="h-9 border-b border-white/10" />
      <div className="h-16 md:h-[4.5rem]" />
    </div>
  );
}
