import Link from "next/link";
import { DollarSign, Percent, Phone } from "lucide-react";
import { site } from "@/config/site";

const iconClass = "size-4 shrink-0 text-[#e10600]";

export function AnnouncementBar() {
  return (
    <div className="bg-[#0b0b0b] text-[13px] text-white/80">
      <div className="mx-auto flex h-12 max-w-[1180px] items-center justify-center gap-x-4 px-4 whitespace-nowrap sm:gap-x-6 lg:gap-x-10">
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#3a0d0d] px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#ff3340]">
          <span className="size-1.5 shrink-0 rounded-full bg-[#e10600]" aria-hidden />
          NOW HIRING
        </span>

        <span className="hidden items-center gap-2 lg:inline-flex">
          <DollarSign className={iconClass} aria-hidden />
          <span>
            Company drivers earn{" "}
            <Link
              href="/careers#company-drivers"
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              $0.65/mile
            </Link>
          </span>
        </span>

        <span className="hidden items-center gap-2 lg:inline-flex">
          <Percent className={iconClass} aria-hidden />
          <span>
            Owner-operators keep{" "}
            <Link
              href="/careers#owner-operators"
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              90% of revenue
            </Link>
          </span>
        </span>

        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-2 font-semibold text-white underline-offset-2 hover:underline"
        >
          <Phone className={iconClass} aria-hidden />
          413-539-7319
        </a>

        <Link
          href="/careers"
          className="inline-flex shrink-0 items-center rounded-full bg-[#e10600] px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-[#c40500]"
        >
          Apply now →
        </Link>
      </div>
    </div>
  );
}
