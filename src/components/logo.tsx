import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const ink = tone === "light" ? "text-cream" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5", ink, className)}>
      <svg viewBox="0 0 36 36" className="size-9 shrink-0" aria-hidden>
        <rect width="36" height="36" rx="8" fill="#e10600" />
        <path
          d="M6 13h10.4L22 18l-5.6 5H6"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M13 13h10.4L29 18l-5.6 5H13"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      <span className="leading-none">
        <span className="block text-[1.05rem] font-extrabold tracking-[-0.04em]">
          RoadRunner
        </span>
        <span className="mt-1 block font-mono text-[10px] tracking-[0.22em] uppercase opacity-75">
          USA
        </span>
      </span>
    </span>
  );
}
