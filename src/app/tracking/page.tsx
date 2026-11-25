import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Tracking",
  description:
    "Send a load number and a RoadRunner USA dispatcher will reply. Trucks use Verizon Connect GPS.",
};

export default function TrackingPage() {
  return (
    <>
      <PageHero
        eyebrow="Tracking"
        title="A load number in. A dispatcher back."
        lede="Verizon Connect rides on the trucks. This page takes the load number and tells the desk to reply. It does not open a live map."
      />
      <section className="bg-cream py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4 text-base leading-7 text-ink/75">
            <p>
              Use the load number from your paperwork. Add your name and either an
              email or a phone number so someone can actually answer.
            </p>
            <p>
              The desk is open {site.hours[0].days.toLowerCase()} {site.hours[0].time}, and{" "}
              {site.hours[1].days.toLowerCase()} {site.hours[1].time}. {site.hoursNote}
            </p>
            <p>
              If the form is the wrong tool, call{" "}
              <a className="font-semibold text-ink underline decoration-signal underline-offset-4" href={site.phoneHref}>
                {site.phone}
              </a>
              .
            </p>
          </div>
          <InquiryForm kind="tracking" />
        </Container>
      </section>
    </>
  );
}
