import Link from "next/link";
import { faqs, partners, photos, places, services, site, steps } from "@/config/site";
import { Container, Eyebrow } from "@/components/container";
import { HubCards } from "@/components/hubs";
import { InquiryForm } from "@/components/inquiry-form";
import { LaneMap } from "@/components/lane-map";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { StatRow } from "@/components/stat-row";
import { buttonVariants } from "@/components/ui/button";

export function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-cream">
        <Container className="grid items-end gap-10 py-12 md:py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <Eyebrow>Dry van · Full truckload</Eyebrow>
            <h1 className="mt-5 text-[clamp(3.1rem,8.4vw,7.1rem)] font-extrabold leading-[0.86] tracking-[-0.055em]">
              <span className="block">Ship safe.</span>
              <span className="block">Ship fast.</span>
              <span className="block text-signal">Ship efficient.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">
              {site.legalName} runs company-operated dry vans, full truckload. One core
              round trip: {site.lane.summary}. Based in North Carolina.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className={buttonVariants({ className: "h-12 px-6 text-base font-semibold" })}
              >
                Get a freight quote
              </Link>
              <Link
                href="/tracking"
                className={buttonVariants({
                  variant: "secondary",
                  className: "h-12 px-6 text-base font-semibold",
                })}
              >
                Track a load
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              <a className="font-semibold text-ink hover:text-signal" href={site.phoneHref}>
                {site.phone}
              </a>
              <span aria-hidden> · </span>
              <a className="hover:text-signal" href={site.emailHref}>
                {site.email}
              </a>
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-ink sm:aspect-[5/4] lg:aspect-[4/5]">
              <Photo src={photos.hero.src} alt={photos.hero.alt} priority className="absolute inset-0" />
            </div>
          </div>
        </Container>
      </section>

      <StatRow />

      <section className="bg-cream py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>The carrier</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] md:text-6xl md:leading-[0.92]">
              Let’s Keep Your Freight Moving.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink/75">
              Whether you’re shipping coast to coast or running a regular lane, Roadrunner USA
              delivers dependable full truckload service, and the team behind it, from our North
              Carolina headquarters.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[1.6rem]">
              <div className="aspect-[5/4]">
                <Photo src={photos.highway.src} alt={photos.highway.alt} />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-paper py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-4 max-w-xl text-4xl font-extrabold tracking-[-0.045em] md:text-6xl md:leading-[0.92]">
                Dispatch, support, tracking, and the trucks.
              </h2>
            </Reveal>
            <Link
              href="/services"
              className="text-sm font-semibold underline decoration-signal decoration-2 underline-offset-4"
            >
              View all services
            </Link>
          </div>
          <ol className="mt-12">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={index * 70}>
                <li className="grid gap-3 border-t border-line py-8 md:grid-cols-[6rem_1fr_1.15fr] md:gap-8">
                  <p className="font-mono text-sm text-signal">{service.number}</p>
                  <h3 className="text-3xl font-extrabold tracking-tight">{service.title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{service.summary}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-line/80 bg-[#f6f5f2]">
        <Container className="py-10 md:py-12">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-[#ddd9d0]" aria-hidden />
            <p className="shrink-0 text-center text-[11px] tracking-[0.18em] text-[#8d8982] uppercase">
              Connected to the platforms shippers use
            </p>
            <span className="h-px flex-1 bg-[#ddd9d0]" aria-hidden />
          </div>
        </Container>
        <div className="partner-marquee relative mt-8 overflow-hidden pb-10 md:pb-12">
          <div className="partner-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {partners.map((name) => (
                  <li
                    key={name}
                    className="px-8 text-[#1a1a1a] opacity-70 grayscale transition-opacity hover:opacity-100 md:px-12"
                  >
                    <PartnerMark name={name} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Container className="grid gap-8">
          <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.75fr)] md:items-center md:gap-12">
            <div>
              <p className="eyebrow text-ink">
                <span className="text-signal">/</span>OUR NETWORK
              </p>
              <h2 className="mt-3 text-[2.15rem] font-normal leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl md:text-[4rem]">
                <span className="block">Three hubs.</span>
                <span className="mt-1 block text-[#b5b1a8]">Coast-to-coast coverage.</span>
              </h2>
            </div>
            <div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                From our North Carolina headquarters to the West Coast, our hubs and dispatch keep
                freight moving across 48 states.
              </p>
              <a
                href="#our-hubs"
                className="mt-5 inline-flex h-11 items-center rounded-full border border-[#d7d4cc] bg-white px-5 text-sm font-semibold text-ink hover:bg-[#f7f6f3]"
              >
                View all locations →
              </a>
            </div>
          </div>
          <Reveal>
            <LaneMap />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {places.map((place) => (
              <article key={place.name} className="rounded-2xl border border-line bg-paper p-5">
                <p className="eyebrow text-signal">{place.role}</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{place.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{place.detail}</p>
              </article>
            ))}
          </div>
          <div id="our-hubs" className="scroll-mt-32">
            <h3 className="text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">Our Hubs</h3>
            <HubCards className="mt-6" />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-cream md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Eyebrow tone="light">How a load moves</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] md:text-5xl md:leading-[0.95]">
              From the form to a dispatcher who can answer.
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
            {steps.map((step) => (
              <li key={step.number} className="bg-ink-soft p-6">
                <p className="font-mono text-sm text-signal">{step.number}</p>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Quote</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] md:text-6xl md:leading-[0.92]">
              Need a rate on this lane?
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/75">
              Name, company, phone, email, both cities, a ship date, and what is
              on the truck. Or call {site.phone}.
            </p>
          </div>
          <InquiryForm kind="quote" />
        </Container>
      </section>

      <section className="border-y border-line bg-paper py-20 md:py-28">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Tracking</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] md:text-5xl md:leading-[0.95]">
              Request a tracking link or location update.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Every load is GPS-tracked with Motive. Send your load number and
              the best way to reach you, and our dispatch team will reply with a
              live tracking link or a current location update.
            </p>
          </div>
          <InquiryForm kind="tracking" />
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[1.6rem]">
            <div className="aspect-[4/3]">
              <Photo src={photos.dusk.src} alt={photos.dusk.alt} className="object-[center_18%]" />
            </div>
          </div>
          <div>
            <Eyebrow>Careers</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] md:text-5xl md:leading-[0.95]">
              Drive a dry van on a round trip you can describe in one sentence.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/75">
              Our drivers run our core lane between Southern California and Dallas, Texas. To
              apply, send your name, phone number, email, years of CDL experience, and a
              short note about yourself. We&apos;ll go over pay and home time with you directly.
            </p>
            <Link
              href="/careers"
              className={buttonVariants({ className: "mt-8 h-12 px-6 text-base font-semibold" })}
            >
              Apply to drive
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] md:text-5xl">
              Based in North Carolina.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              {site.legalName} is based in North Carolina. The trucks work the
              California–Texas round trip. That is the company.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-semibold underline decoration-signal decoration-2 underline-offset-4"
            >
              Read about the company
            </Link>
          </div>
          <div className="divide-y divide-line rounded-2xl border border-line">
            {faqs.slice(0, 4).map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="font-mono text-signal group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="pt-3 pr-8 text-sm leading-6 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-signal text-white">
        <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
          <div>
            <p className="eyebrow text-white/80">
              <span className="text-white">/</span> Dispatch
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.045em] md:text-5xl">
              Ship safe. Ship fast. Ship efficient.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className={buttonVariants({
                variant: "secondary",
                className: "h-12 px-6 text-base",
              })}
            >
              Get a freight quote
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({
                variant: "outline",
                className:
                  "h-12 border-white/40 bg-transparent px-6 text-base text-white hover:bg-white hover:text-ink",
              })}
            >
              Contact the office
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function PartnerMark({ name }: { name: (typeof partners)[number] }) {
  if (name === "Descartes MacroPoint") {
    return (
      <span className="inline-flex flex-col items-start leading-none">
        <span className="text-[0.62rem] font-medium tracking-[0.28em]">DESCARTES</span>
        <span className="mt-1 text-lg font-semibold tracking-[-0.03em]">MacroPoint</span>
      </span>
    );
  }
  if (name === "project44") {
    return <span className="text-2xl font-bold tracking-[-0.04em] lowercase">project44</span>;
  }
  if (name === "Motive") {
    return <span className="text-[1.65rem] font-semibold tracking-[-0.04em]">Motive</span>;
  }
  if (name === "Highway") {
    return <span className="text-xl font-extrabold tracking-[0.16em]">HIGHWAY</span>;
  }
  if (name === "Trucker Tools") {
    return <span className="text-xl font-bold tracking-tight">Trucker Tools</span>;
  }
  return <span className="text-[0.8rem] font-medium tracking-[0.2em] uppercase">Verified Carrier</span>;
}
