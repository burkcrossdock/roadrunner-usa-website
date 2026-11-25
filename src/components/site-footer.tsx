import Link from "next/link";
import { hubs, site, socials } from "@/config/site";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-lg font-semibold tracking-tight">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-cream/70">
            {site.legalName} is a company-operated carrier specializing in full truckloads.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {socials.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-cream/75 hover:text-white"
                  target="_blank"
                  rel="noopener"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
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
            <p className="mt-4 text-sm leading-6 text-cream/80">{site.location}</p>
            <p className="eyebrow mt-6 text-cream/50">Our Hubs</p>
            <ul className="mt-3 space-y-1 text-sm leading-6 text-cream/80">
              {hubs.map((hub) => (
                <li key={hub.city}>
                  {hub.city}, {hub.state}
                </li>
              ))}
            </ul>
            <address className="mt-4 space-y-2 text-sm not-italic leading-6 text-cream/80">
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
        <Container className="py-5 text-xs text-cream/45">
          <p>© 2026 {site.legalName}.</p>
        </Container>
      </div>
    </footer>
  );
}
