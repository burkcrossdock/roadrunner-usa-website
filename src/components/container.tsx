import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1180px] px-5 md:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "ink",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "light" ? "text-cream/70" : "text-muted-foreground",
        className,
      )}
    >
      <span className="text-signal">/</span> {children}
    </p>
  );
}
