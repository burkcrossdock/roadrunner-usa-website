import Link from "next/link";
import { partners, site, socials } from "@/config/site";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-lg font-semibold tracking-tight">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-cream/70">
            {site.legalName} runs {site.fleetCount} dry vans, full truckload, on the{" "}
            {site.lane.summary.toLowerCase()}.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="eyebrow text-cream/50">Shippers</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="hover:text-white" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/quote">
                  Get a quote
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/tracking">
                  Track a load
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-cream/50">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="hover:text-white" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/careers">
                  Driver careers
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-cream/50">Office</p>
            <address className="mt-4 space-y-2 text-sm not-italic leading-6 text-cream/80">
              <p>
                <a className="hover:text-white" href={site.mapsHref}>
                  {site.address.line1}
                  <br />
                  {site.address.city} {site.address.state} {site.address.zip}
                </a>
              </p>
              <p>
                <a className="hover:text-white" href={site.phoneHref}>
                  {site.phone}
                </a>
              </p>
              <p>
                <a className="hover:text-white" href={site.emailHref}>
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-cream/45">Hours · Eastern</p>
            <ul className="mt-2 space-y-1 text-sm text-cream/75">
              {site.hours.map((row) => (
                <li key={row.days}>
                  {row.days} · {row.time}
                </li>
              ))}
              <li>{site.hoursNote}</li>
            </ul>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {socials.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-cream/75 hover:text-white"
                  title={item.note}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {site.legalName}. Partners: {partners.join(" · ")}.
          </p>
          <p>Truck photography via Pexels and Unsplash. Not photos of this fleet.</p>
        </Container>
      </div>
    </footer>
  );
}
