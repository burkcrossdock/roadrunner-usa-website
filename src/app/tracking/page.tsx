import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Tracking",
  description:
    "Every load is GPS-tracked with Motive. Request a tracking link or a current location update from dispatch.",
};

export default function TrackingPage() {
  return (
    <>
      <PageHero
        eyebrow="Tracking"
        title="Request a tracking link or location update."
        lede="Every load is GPS-tracked with Motive. Send your load number and the best way to reach you, and our dispatch team will reply with a live tracking link or a current location update."
      />
      <section className="bg-cream py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4 text-base leading-7 text-ink/75">
            <p>
              Use the load number from your paperwork. Add your name and either an
              email or a phone number.
            </p>
            <p>
              Or call{" "}
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
