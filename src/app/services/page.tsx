import type { Metadata } from "next";
import Link from "next/link";
import { photos, services, site } from "@/config/site";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description: `Dispatch, customer support, Verizon Connect GPS, and dry van truckload on the ${site.lane.summary}.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Dispatch, support, tracking, and the trucks."
        lede={`${site.legalName} offers four things, and they all sit on the same lane: ${site.lane.summary}.`}
      />
      <section className="bg-cream py-16 md:py-24">
        <Container className="grid gap-16">
          {services.map((service, index) => {
            const photo = [photos.highway, photos.desk, photos.dusk, photos.hero][index] ?? photos.hero;
            return (
            <article
              key={service.number}
              className="grid items-center gap-8 border-t border-line pt-10 lg:grid-cols-2"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <p className="font-mono text-sm text-signal">{service.number}</p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em]">{service.title}</h2>
                <p className="mt-4 text-lg leading-8 text-ink/75">{service.body}</p>
              </div>
              <div className={`overflow-hidden rounded-[1.4rem] ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="aspect-[16/10]">
                  <Photo src={photo.src} alt={photo.alt} />
                </div>
              </div>
            </article>
            );
          })}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className={buttonVariants({ className: "h-12 px-6 text-base" })}>
              Get a freight quote
            </Link>
            <Link
              href="/tracking"
              className={buttonVariants({
                variant: "secondary",
                className: "h-12 px-6 text-base",
              })}
            >
              Send a load number
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
