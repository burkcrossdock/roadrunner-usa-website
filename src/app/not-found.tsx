import Link from "next/link";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <Container className="py-24">
        <p className="eyebrow text-muted-foreground">
          <span className="text-signal">/</span> 404
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-[-0.05em]">That page is not on this site.</h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          The lane is still Southern California to Dallas. Start from the homepage or send a quote.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ className: "h-12 px-6" })}>
            Back home
          </Link>
          <Link
            href="/quote"
            className={buttonVariants({ variant: "secondary", className: "h-12 px-6" })}
          >
            Get a quote
          </Link>
        </div>
      </Container>
    </section>
  );
}
