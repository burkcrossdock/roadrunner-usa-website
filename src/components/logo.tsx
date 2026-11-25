import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "default",
  className,
  priority = false,
}: {
  tone?: "default" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "light" ? "/brand/roadrunner-logo-light.svg" : "/brand/roadrunner-logo.svg"}
      alt="RoadRunner USA"
      width={3000}
      height={464}
      priority={priority}
      loading={priority ? undefined : "eager"}
      unoptimized
      className={cn("h-8 w-auto sm:h-9 lg:h-10", className)}
      style={{ width: "auto" }}
    />
  );
}
