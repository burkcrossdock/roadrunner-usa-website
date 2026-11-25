import type { Metadata } from "next";
import Link from "next/link";
import { hubs, partners, photos, site } from "@/config/site";
import { Container } from "@/components/container";
import { LaneMap } from "@/components/lane-map";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: `${site.legalName} is based in North Carolina and runs company-operated dry vans on the Southern California–Dallas round trip.`,
};

const facts = [
  { label: "Legal name", value: site.legalName },
  { label: "Brand", value: site.brand },
  { label: "Fleet", value: "Company-operated dry vans" },
  { label: "Freight", value: "Full truckload" },
  { label: "Main lane", value: site.lane.summary },
  { label: "Office", value: site.location },
  { label: "Hubs", value: hubs.map((hub) => `${hub.city}, ${hub.state}`).join(" · ") },
  { label: "Phone", value: site.phone },
  { label: "Email", value: site.email },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built around one lane, not a national map."
        lede={`${site.brand} is the name on the work. ${site.legalName} is the company. Based in North Carolina. The trucks run Southern California and Dallas.`}
      />
      <section className="bg-cream py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-lg leading-8 text-ink/75">
            <p>
              Company-operated dry vans. Full truckloads. A round trip between Southern California
              and Dallas, Texas. Lane #2 runs Dallas, TX to Charlotte, NC. Dispatch and customer support are based in North
              Carolina. Hubs are in {hubs.map((hub) => `${hub.city}, ${hub.state}`).join("; ")}.
            </p>
            <p>
              Live location on the trucks is Motive. Partners named by
              the company are {partners.join(", ")}. The tagline is the operating
              idea: {site.tagline}
            </p>
            <p>
              Hours at the desk are {site.hours[0].days} {site.hours[0].time}, and{" "}
              {site.hours[1].days} {site.hours[1].time}. {site.hoursNote}
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem]">
            <div className="aspect-[4/3]">
              <Photo src={photos.highway.src} alt={photos.highway.alt} />
            </div>
          </div>
        </Container>
        <Container className="mt-14">
          <dl className="grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="border-b border-line bg-paper p-5 sm:[&:nth-child(odd)]:border-r">
                <dt className="eyebrow text-muted-foreground">{fact.label}</dt>
                <dd className="mt-2 text-lg font-semibold tracking-tight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
        <Container className="mt-14 grid gap-8">
          <LaneMap />
          <Link href="/contact" className={buttonVariants({ className: "h-12 w-fit px-6" })}>
            Contact the office
          </Link>
        </Container>
      </section>
    </>
  );
}
