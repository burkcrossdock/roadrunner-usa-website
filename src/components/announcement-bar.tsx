import Link from "next/link";
import { Clock, DollarSign, Percent, Phone, Truck } from "lucide-react";
import { site } from "@/config/site";

function Dot() {
  return (
    <span className="px-0.5 text-white/40" aria-hidden>
      ·
    </span>
  );
}

const iconClass = "size-3.5 shrink-0 text-[#e10600]";

export function AnnouncementBar() {
  return (
    <div className="bg-[#0b0b0b] text-[11px] text-white/75 lg:text-[10px] xl:text-[12.5px]">
      <div className="flex h-10 items-center gap-2 overflow-x-auto px-3 whitespace-nowrap [scrollbar-width:none] lg:px-4 xl:px-6 [&::-webkit-scrollbar]:hidden">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#3a0d0d] px-2 py-0.5 font-bold tracking-[0.12em] text-[#ff3340]">
          <span className="size-1.5 shrink-0 rounded-full bg-[#e10600]" aria-hidden />
          NOW HIRING
        </span>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Dot />
            <DollarSign className={iconClass} aria-hidden />
            <span>
              Company drivers earn{" "}
              <Link
                href="/careers#company-drivers"
                className="font-semibold text-white underline-offset-2 hover:underline"
              >
                $0.70/mile
              </Link>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Dot />
            <Truck className={iconClass} aria-hidden />
            <span>Steady miles year-round</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Dot />
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
          <span className="inline-flex items-center gap-1.5">
            <Dot />
            <Clock className={iconClass} aria-hidden />
            <span>24/7 dispatch support</span>
          </span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-2 xl:gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Dot />
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-1 font-semibold text-white underline-offset-2 hover:underline"
            >
              <Phone className={iconClass} aria-hidden />
              413-539-7319
            </a>
          </span>
          <Link
            href="/careers"
            className="inline-flex items-center rounded-full bg-[#e10600] px-2.5 py-1 font-semibold text-white hover:bg-[#c40500]"
          >
            Apply now →
          </Link>
        </div>
      </div>
    </div>
  );
}
