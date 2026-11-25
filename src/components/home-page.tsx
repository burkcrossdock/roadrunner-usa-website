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
              One round trip. Full truckload.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-ink/75">
              <p>
                Roadrunner USA Inc keeps the work specific. Company-operated dry
                vans haul full truckloads. Trucks run Southern
                California to Dallas, Texas, then turn around and come back.
              </p>
              <p>
                Quotes, dispatch, and customer support are based in North Carolina. The
                brand on the road is {site.brand}. The
                line is the whole pitch: {site.tagline}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[1.6rem] bg-ink">
              <div className="aspect-[5/4]">
                <Photo src={photos.highway.src} alt={photos.highway.alt} />
              </div>
              <p className="px-5 py-4 font-mono text-[11px] tracking-[0.14em] text-cream/70 uppercase">
                Dry van on the highway · stock photo
              </p>
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
                Four things this desk actually does.
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

      <section className="border-b border-line bg-cream">
        <Container className="py-10">
          <p className="eyebrow text-muted-foreground">
            <span className="text-signal">/</span> Partners
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((name) => (
              <li
                key={name}
                className="flex h-20 items-center justify-center rounded-xl border border-line bg-paper px-3 text-center text-sm font-extrabold tracking-tight text-ink/80 md:text-base"
              >
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Container className="grid gap-8">
          <Reveal>
            <Eyebrow>Lane</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-[-0.045em] md:text-6xl md:leading-[0.92]">
              Southern California to Dallas, then back again.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">
              Lane #2 runs Dallas, TX to Charlotte, NC.
            </p>
          </Reveal>
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
          <div>
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
            <p className="mt-5 text-cream/70">
              No promised window, and no invented on-time score. You send the
              facts. The desk replies during the hours below.
            </p>
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
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {site.hours.map((row) => (
                <li key={row.days}>
                  {row.days} · {row.time}
                </li>
              ))}
              <li>{site.hoursNote}</li>
            </ul>
          </div>
          <InquiryForm kind="quote" />
        </Container>
      </section>

      <section className="border-y border-line bg-paper py-20 md:py-28">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Tracking</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] md:text-5xl md:leading-[0.95]">
              Send the load number. A dispatcher replies.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Live GPS is Motive, used by the desk. This site does not
              show a public map or a made-up truck ping. Put the load number in
              the form and include a way to reach you.
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
              Southern California to Dallas, and Dallas back to Southern California.
              Send your name, phone, email, years with a CDL, and a short note.
              Pay and home time are discussed with you. They are not listed here.
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
              <span className="text-white">/</span> Ready when the desk is
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
