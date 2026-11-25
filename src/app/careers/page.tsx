import type { Metadata } from "next";
import { photos, site } from "@/config/site";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Company drivers earn $0.70/mile. Owner-operators keep 90% of revenue. Apply to drive a dry van for RoadRunner USA on the Southern California to Dallas round trip.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Drive the Southern California–Dallas round trip."
        lede="Dry van, full truckload, both directions. Company drivers earn $0.70/mile. Owner-operators keep 90% of revenue. Send your name, phone, email, years with a CDL, and a note."
      />
      <section className="border-b border-line bg-paper">
        <Container className="grid gap-10 py-12 md:grid-cols-2 md:py-16">
          <article id="company-drivers" className="scroll-mt-48">
            <p className="eyebrow text-muted-foreground">
              <span className="text-signal">/</span> Company drivers
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Company drivers earn $0.70/mile.
            </h2>
            <p className="mt-3 text-base leading-7 text-ink/75">
              Company driving on the Southern California–Dallas round trip pays $0.70 a mile.
              Apply with the form on this page. The office replies during posted hours.
            </p>
          </article>
          <article id="owner-operators" className="scroll-mt-48">
            <p className="eyebrow text-muted-foreground">
              <span className="text-signal">/</span> Owner-operators
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Owner-operators keep 90% of revenue.
            </h2>
            <p className="mt-3 text-base leading-7 text-ink/75">
              Owner-operators on this lane keep 90% of revenue. Apply with the form on this
              page. Home time and equipment are a conversation with the office.
            </p>
          </article>
        </Container>
      </section>
      <section className="bg-cream py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="overflow-hidden rounded-[1.4rem]">
              <div className="aspect-[4/3]">
                <Photo src={photos.dusk.src} alt={photos.dusk.alt} className="object-[center_18%]" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-base leading-7 text-ink/75">
              <p>
                {site.legalName} runs {site.fleetCount} dry vans. If you want that
                lane, apply here. Company drivers earn $0.70/mile. Owner-operators
                keep 90% of revenue. Home time and equipment are a conversation
                with the office.
              </p>
              <p>
                Questions before you apply: {site.phone} or {site.email}.{" "}
                {site.hours[0].days} {site.hours[0].time}. {site.hours[1].days}{" "}
                {site.hours[1].time}.
              </p>
            </div>
          </div>
          <div id="apply" className="scroll-mt-48">
            <InquiryForm kind="career" />
          </div>
        </Container>
      </section>
    </>
  );
}
