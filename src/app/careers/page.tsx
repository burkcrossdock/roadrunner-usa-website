import type { Metadata } from "next";
import { photos, site } from "@/config/site";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Apply to drive a dry van for RoadRunner USA on the Southern California to Dallas round trip.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Drive the Southern California–Dallas round trip."
        lede="Dry van, full truckload, both directions. Send your name, phone, email, years with a CDL, and a note. The office replies during posted hours."
      />
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
                lane, apply here. Pay, home time, and equipment details are a
                conversation with the office, not a number invented for this page.
              </p>
              <p>
                Questions before you apply: {site.phone} or {site.email}.{" "}
                {site.hours[0].days} {site.hours[0].time}. {site.hours[1].days}{" "}
                {site.hours[1].time}.
              </p>
            </div>
          </div>
          <InquiryForm kind="career" />
        </Container>
      </section>
    </>
  );
}
