import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: `Request a dry van full-truckload rate on the ${site.lane.summary}.`,
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a quote"
        title="Tell the desk what is moving."
        lede="Pickup city, delivery city, ship date, and the freight. The office replies during posted hours."
      />
      <section className="bg-cream py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="rounded-2xl border border-line bg-paper p-6">
            <p className="eyebrow text-muted-foreground">
              <span className="text-signal">/</span> Before you send it
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-ink/80">
              <li>The core lane is {site.lane.summary}.</li>
              <li>Equipment is dry van. The move is full truckload.</li>
              <li>Fleet size is {site.fleetCount} trucks.</li>
              <li>
                Desk hours: {site.hours.map((row) => `${row.days} ${row.time}`).join(". ")}.{" "}
                {site.hoursNote}
              </li>
            </ul>
            <p className="mt-6 text-sm">
              <a className="font-semibold underline decoration-signal underline-offset-4" href={site.phoneHref}>
                {site.phone}
              </a>
              <br />
              <a className="underline-offset-4 hover:underline" href={site.emailHref}>
                {site.email}
              </a>
            </p>
          </aside>
          <InquiryForm kind="quote" />
        </Container>
      </section>
    </>
  );
}
