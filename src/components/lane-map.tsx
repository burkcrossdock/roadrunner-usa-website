import { site } from "@/config/site";

export function LaneMap() {
  return (
    <figure className="overflow-hidden rounded-[1.6rem] bg-ink text-cream">
      <div className="flex items-end justify-between gap-4 px-5 pt-5 md:px-8 md:pt-7">
        <div>
          <p className="eyebrow text-cream/55">
            <span className="text-signal">/</span> Core lane
          </p>
          <figcaption className="mt-2 max-w-md text-sm text-cream/70">
            Round trip between {site.lane.west} and {site.lane.east}.
          </figcaption>
        </div>
        <p className="hidden font-mono text-[11px] tracking-[0.16em] text-cream/40 uppercase sm:block">
          Dry van · FTL
        </p>
      </div>
      <svg
        viewBox="0 0 1000 460"
        role="img"
        aria-label="Schematic map of the Southern California to Dallas round trip"
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#243028" />
            <stop offset="1" stopColor="#172019" />
          </linearGradient>
        </defs>
        <rect width="1000" height="460" fill="#101410" />
        {Array.from({ length: 12 }).map((_, index) => (
          <line
            key={index}
            x1="0"
            x2="1000"
            y1={40 + index * 34}
            y2={40 + index * 34}
            stroke="#ffffff"
            strokeOpacity="0.04"
          />
        ))}
        <path
          d="M70 150 C140 80 230 70 300 120 C360 160 390 230 360 290 C330 350 250 390 170 360 C90 330 40 230 70 150 Z"
          fill="url(#land)"
        />
        <path
          d="M430 120 C520 70 640 80 720 140 C790 190 800 280 740 330 C670 390 540 370 490 310 C450 260 400 180 430 120 Z"
          fill="url(#land)"
        />
        <path
          d="M188 248 C300 140 430 340 612 214"
          fill="none"
          stroke="#e10600"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className="lane-dash"
          d="M188 248 C300 140 430 340 612 214"
          fill="none"
          stroke="#ffd7d4"
          strokeWidth="2"
          strokeDasharray="10 14"
          strokeLinecap="round"
        />
        <path
          d="M188 274 C310 176 450 360 612 240"
          fill="none"
          stroke="#e10600"
          strokeOpacity="0.45"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="188" cy="248" r="11" fill="#e10600" />
        <circle cx="188" cy="248" r="4" fill="#fff" />
        <circle cx="612" cy="214" r="11" fill="#e10600" />
        <circle cx="612" cy="214" r="4" fill="#fff" />
        <text x="188" y="292" fill="#f3f2ee" fontSize="18" fontFamily="ui-sans-serif, system-ui">
          Southern California
        </text>
        <text x="188" y="314" fill="#f3f2ee" opacity="0.55" fontSize="13" fontFamily="ui-monospace, monospace">
          LANE END
        </text>
        <text x="560" y="178" fill="#f3f2ee" fontSize="18" fontFamily="ui-sans-serif, system-ui">
          Dallas, TX
        </text>
        <text x="560" y="158" fill="#f3f2ee" opacity="0.55" fontSize="13" fontFamily="ui-monospace, monospace">
          LANE END
        </text>
        <text x="360" y="210" fill="#ffd0cc" fontSize="13" fontFamily="ui-monospace, monospace">
          ROUND TRIP
        </text>
      </svg>
      <div className="grid gap-px bg-white/10 sm:grid-cols-2">
        <Legend swatch="bg-signal" title="Red pair" body="The same lane, both directions." />
        <Legend swatch="bg-white/30" title="Schematic" body="Cities are placed for reading, not to scale." />
      </div>
    </figure>
  );
}

function Legend({
  swatch,
  title,
  body,
}: {
  swatch: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-ink px-5 py-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <span className={`size-2.5 rounded-full ${swatch}`} aria-hidden />
        {title}
      </p>
      <p className="mt-1 text-xs leading-5 text-cream/60">{body}</p>
    </div>
  );
}
