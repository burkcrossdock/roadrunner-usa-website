import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // Hotlinked stock. next/image optimization is skipped so the photos
    // still render if the optimizer cannot reach the host.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={1600}
      height={1066}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("block h-full w-full object-cover", className)}
    />
  );
}
