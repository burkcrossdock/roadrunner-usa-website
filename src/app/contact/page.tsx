import type { Metadata } from "next";
import { partners, site, socials } from "@/config/site";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, email, or write ${site.legalName} at ${site.address.full}. ${site.phone}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="The desk is in Matthews."
        lede="Call, email, or send a note. Quote requests and load numbers have their own forms if that is what you need."
      />
      <section className="bg-cream py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-8">
            <div>
              <p className="eyebrow text-muted-foreground">
                <span className="text-signal">/</span> Office
              </p>
              <address className="mt-3 text-lg not-italic leading-8">
                <a className="font-semibold hover:text-signal" href={site.mapsHref}>
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </address>
              <p className="mt-4">
                <a className="text-lg font-semibold hover:text-signal" href={site.phoneHref}>
                  {site.phone}
                </a>
                <br />
                <a className="hover:text-signal" href={site.emailHref}>
                  {site.email}
                </a>
              </p>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">
                <span className="text-signal">/</span> Hours · Eastern
              </p>
              <ul className="mt-3 space-y-1 text-base">
                {site.hours.map((row) => (
                  <li key={row.days}>
                    {row.days} · {row.time}
                  </li>
                ))}
                <li className="text-muted-foreground">{site.hoursNote}</li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">
                <span className="text-signal">/</span> Also on the site
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                <li>
                  <a className="underline decoration-signal underline-offset-4" href="/quote">
                    Get a freight quote
                  </a>
                </li>
                <li>
                  <a className="underline decoration-signal underline-offset-4" href="/tracking">
                    Send a load number
                  </a>
                </li>
                <li>
                  <a className="underline decoration-signal underline-offset-4" href="/careers">
                    Driver application
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">
                <span className="text-signal">/</span> Social
              </p>
              <ul className="mt-3 flex flex-wrap gap-4 text-sm">
                {socials.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} title={item.note} className="hover:text-signal">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">Partners: {partners.join(", ")}.</p>
            </div>
          </div>
          <InquiryForm kind="contact" />
        </Container>
      </section>
    </>
  );
}
