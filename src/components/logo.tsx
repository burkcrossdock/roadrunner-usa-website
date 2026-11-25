import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className="inline-flex items-center rounded-md bg-white px-1.5 py-0.5">
      <Image
        src="/brand/roadrunner-logo.svg"
        alt="RoadRunner USA"
        width={3000}
        height={464}
        priority={priority}
        unoptimized
        className={cn("h-8 w-auto sm:h-9 xl:h-11", className)}
        style={{ width: "auto" }}
      />
    </span>
  );
}
