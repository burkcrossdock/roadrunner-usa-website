import { Container, Eyebrow } from "@/components/container";

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="border-b border-line bg-cream">
      <Container className="py-14 md:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{lede}</p>
      </Container>
    </section>
  );
}
