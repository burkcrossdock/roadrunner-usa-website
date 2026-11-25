"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { hubs } from "@/config/site";

const VIEW = { width: 632, height: 412, pad: 16 };
const BOUNDS = { minLon: -125.4, maxLon: -66.5, minLat: 24.2, maxLat: 49.8 };

/** Simplified contiguous United States outline, west coast first, traced clockwise. */
const OUTLINE: Array<[number, number]> = [
  [-124.7, 48.35], [-124.5, 47.6], [-124.05, 46.25], [-124.05, 44.55],
  [-124.4, 43.3], [-124.25, 42.0], [-124.4, 40.45], [-123.8, 39.1],
  [-123.0, 38.0], [-122.5, 37.7], [-121.9, 36.3], [-120.9, 35.2],
  [-120.6, 34.45], [-119.2, 34.25], [-118.5, 33.95], [-117.25, 32.55],
  [-114.6, 32.55], [-111.05, 31.33], [-108.2, 31.33], [-106.5, 31.78],
  [-104.6, 29.6], [-103.0, 29.0], [-101.4, 29.7], [-99.5, 27.6],
  [-97.4, 25.9], [-97.15, 27.7], [-96.4, 28.4], [-95.0, 29.0],
  [-93.9, 29.7], [-92.0, 29.6], [-90.2, 29.15], [-89.2, 29.15],
  [-88.5, 30.25], [-87.2, 30.35], [-85.6, 29.7], [-84.3, 30.05],
  [-83.4, 29.15], [-82.7, 27.7], [-82.4, 26.7], [-81.8, 25.8],
  [-81.4, 25.15], [-80.4, 25.2], [-80.05, 26.9], [-80.4, 28.5],
  [-81.3, 30.7], [-81.4, 31.4], [-80.9, 32.05], [-79.7, 32.75],
  [-78.6, 33.85], [-77.9, 34.2], [-76.5, 34.7], [-75.7, 35.25],
  [-75.5, 35.9], [-75.95, 36.95], [-76.0, 37.3], [-75.4, 37.9],
  [-75.2, 38.45], [-74.95, 39.0], [-74.4, 39.35], [-74.05, 40.5],
  [-73.0, 40.85], [-71.9, 41.05], [-70.05, 41.35], [-69.95, 41.75],
  [-70.7, 42.35], [-70.25, 43.55], [-68.2, 44.35], [-67.05, 44.8],
  [-67.4, 45.6], [-68.0, 47.25], [-69.4, 47.35], [-71.2, 45.25],
  [-73.3, 45.0], [-74.7, 45.0], [-76.2, 44.15], [-78.8, 43.35],
  [-80.8, 42.55], [-83.05, 41.7], [-83.15, 42.35], [-82.45, 43.55],
  [-82.7, 44.0], [-83.45, 45.35], [-84.6, 45.8], [-85.6, 45.95],
  [-86.4, 46.45], [-88.3, 46.55], [-90.4, 46.75], [-92.1, 46.75],
  [-93.4, 48.2], [-95.15, 49.25], [-104.05, 49.0], [-116.5, 49.0],
  [-122.8, 49.0], [-124.7, 48.5],
];

const INTERSTATES: Array<Array<[number, number]>> = [
  [[-122.4, 47.6], [-122.7, 45.5], [-121.5, 38.6], [-118.2, 34.05], [-117.2, 32.7]],
  [[-118.2, 34.0], [-112.1, 33.4], [-106.5, 31.8], [-98.5, 29.4], [-95.4, 29.8], [-90.1, 30.0], [-81.7, 30.3]],
  [[-117.0, 34.9], [-111.6, 35.2], [-106.6, 35.1], [-101.8, 35.2], [-97.5, 35.5], [-90.0, 35.1], [-86.8, 36.2], [-82.5, 35.6]],
  [[-122.4, 37.8], [-119.8, 39.5], [-111.9, 40.8], [-104.8, 41.1], [-96.0, 41.3], [-87.6, 41.9], [-81.7, 41.5], [-74.0, 40.7]],
  [[-80.2, 25.8], [-81.7, 30.3], [-77.5, 37.5], [-74.0, 40.7], [-71.1, 42.4]],
  [[-93.3, 44.9], [-94.6, 39.1], [-97.5, 35.5], [-96.8, 32.8], [-98.5, 29.4]],
];

const CITIES: Array<{ name: string; lon: number; lat: number; dx: number; dy: number }> = [
  { name: "Los Angeles", lon: -118.24, lat: 34.05, dx: -58, dy: 16 },
  { name: "Phoenix", lon: -112.07, lat: 33.45, dx: -10, dy: 18 },
  { name: "El Paso", lon: -106.49, lat: 31.76, dx: -14, dy: 16 },
  { name: "Dallas", lon: -96.8, lat: 32.78, dx: 12, dy: 18 },
  { name: "Atlanta", lon: -84.39, lat: 33.75, dx: 8, dy: 16 },
  { name: "Charlotte", lon: -80.84, lat: 35.23, dx: -58, dy: 14 },
];

const HUB_INFO = {
  "Mira Loma": {
    lon: -117.52,
    lat: 34.01,
    detail: "West Coast hub · Southern California",
  },
  Grapevine: {
    lon: -97.08,
    lat: 32.93,
    detail: "Texas hub · Dallas–Fort Worth",
  },
  "Rock Hill": {
    lon: -81.03,
    lat: 34.92,
    detail: "Southeast hub · Carolinas",
  },
} as const;

const HQ = { lon: -80.55, lat: 35.6, label: "HQ · North Carolina" };

const EASTBOUND: Array<[number, number]> = [
  [-117.52, 34.01],
  [-112.2, 34.55],
  [-106.4, 34.25],
  [-101.4, 33.55],
  [-97.08, 32.93],
];

const WESTBOUND: Array<[number, number]> = [
  [-97.08, 32.93],
  [-101.8, 32.15],
  [-107.0, 32.45],
  [-112.6, 33.15],
  [-117.52, 34.01],
];

/** Grapevine to the North Carolina HQ, bowed north and passing just above Rock Hill. */
const OCCASIONAL_EAST: Array<[number, number]> = [
  [-97.08, 32.93],
  [-92.4, 33.85],
  [-87.4, 34.45],
  [-83.6, 34.85],
  [-81.2, 35.15],
  [-80.55, 35.6],
];

/** Return trip, bowed south and passing just below Rock Hill. */
const OCCASIONAL_WEST: Array<[number, number]> = [
  [-80.55, 35.6],
  [-81.25, 34.5],
  [-84.8, 33.55],
  [-89.6, 33.05],
  [-93.8, 32.7],
  [-97.08, 32.93],
];

const PANEL_ORDER = ["Mira Loma", "Grapevine", "Rock Hill"] as const;

type Selection = "hq" | (typeof PANEL_ORDER)[number];

function project(lon: number, lat: number) {
  const innerW = VIEW.width - VIEW.pad * 2;
  const innerH = VIEW.height - VIEW.pad * 2;
  const x = VIEW.pad + ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * innerW;
  const y = VIEW.pad + ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * innerH;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10] as const;
}

function linePath(points: Array<[number, number]>) {
  return points
    .map(([lon, lat], index) => {
      const [x, y] = project(lon, lat);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function pointAlong(points: Array<[number, number]>, distanceRatio: number) {
  const projected = points.map(([lon, lat]) => project(lon, lat));
  const lengths: number[] = [];
  let total = 0;
  for (let index = 1; index < projected.length; index += 1) {
    const length = Math.hypot(
      projected[index][0] - projected[index - 1][0],
      projected[index][1] - projected[index - 1][1],
    );
    lengths.push(length);
    total += length;
  }
  let remaining = Math.min(Math.max(distanceRatio, 0), 1) * total;
  for (let index = 0; index < lengths.length; index += 1) {
    if (remaining <= lengths[index]) {
      const start = projected[index];
      const end = projected[index + 1];
      const ratio = lengths[index] === 0 ? 0 : remaining / lengths[index];
      return [start[0] + (end[0] - start[0]) * ratio, start[1] + (end[1] - start[1]) * ratio] as const;
    }
    remaining -= lengths[index];
  }
  return projected[projected.length - 1];
}

const outline = linePath(OUTLINE) + " Z";
const eastPath = linePath(EASTBOUND);
const westPath = linePath(WESTBOUND);
const lane2EastPath = linePath(OCCASIONAL_EAST);
const lane2WestPath = linePath(OCCASIONAL_WEST);

const locatedHubs = PANEL_ORDER.flatMap((city) => {
  const hub = hubs.find((item) => item.city === city);
  if (!hub) return [];
  return [{ ...hub, ...HUB_INFO[city] }];
});

export function LaneMap() {
  const [selected, setSelected] = useState<Selection>("hq");
  const [reduceMotion, setReduceMotion] = useState(false);
  const rawId = useId().replace(/:/g, "");
  const dotsId = `${rawId}-dots`;
  const glowId = `${rawId}-glow`;
  const clipId = `${rawId}-us`;
  const activeHub = locatedHubs.find((hub) => hub.city === selected);
  const eastTruck = pointAlong(EASTBOUND, 0.34);
  const westTruck = pointAlong(WESTBOUND, 0.58);
  const lane2EastTruck = pointAlong(OCCASIONAL_EAST, 0.42);
  const lane2WestTruck = pointAlong(OCCASIONAL_WEST, 0.62);
  const lane1Label = pointAlong(EASTBOUND, 0.48);
  const lane2Label = pointAlong(OCCASIONAL_EAST, 0.4);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <figure className="overflow-hidden rounded-[1.6rem] bg-[#101410] text-cream">
      <div className="flex flex-wrap items-end justify-between gap-3 px-5 pt-5 md:px-6 md:pt-6">
        <div>
          <p className="eyebrow text-cream/55">
            <span className="text-signal">/</span> Core lane
          </p>
          <figcaption className="mt-2 max-w-md text-sm text-cream/70">
            Lane #1 runs Dallas, TX to Southern California. Lane #2 runs Dallas, TX to Charlotte, NC.
          </figcaption>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip>{hubs.length} hubs</Chip>
          <Chip>2 lanes</Chip>
        </div>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1.5fr)_18.5rem]">
        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          role="img"
          aria-label="Map of the contiguous United States showing Lane 1 from Dallas, Texas to Southern California in red, and Lane 2 from Dallas, Texas to Charlotte, North Carolina in blue, with three hubs and headquarters in North Carolina"
          className="h-auto w-full"
        >
          <defs>
            <pattern id={dotsId} width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.55" fill="#ffffff" opacity="0.16" />
            </pattern>
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${glowId}-blue`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id={clipId}>
              <path d={outline} />
            </clipPath>
          </defs>

          <rect width={VIEW.width} height={VIEW.height} fill="#101410" />
          <g clipPath={`url(#${clipId})`}>
            <rect width={VIEW.width} height={VIEW.height} fill="#17211b" />
            <rect width={VIEW.width} height={VIEW.height} fill={`url(#${dotsId})`} />
            {INTERSTATES.map((route) => (
              <path
                key={route[0].join(",")}
                d={linePath(route)}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.16"
                strokeWidth="0.9"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
          </g>
          <path d={outline} fill="none" stroke="#8ea396" strokeOpacity="0.45" strokeWidth="1.25" />

          {CITIES.map((city) => {
            const [x, y] = project(city.lon, city.lat);
            return (
              <text
                key={city.name}
                x={x + city.dx}
                y={y + city.dy}
                fill="#f3f2ee"
                fillOpacity="0.55"
                fontSize="9"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {city.name}
              </text>
            );
          })}

          <g filter={`url(#${glowId}-blue)`}>
            <path
              d={lane2EastPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={lane2WestPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <text
            x={lane2Label[0]}
            y={lane2Label[1] - 12}
            textAnchor="middle"
            fill="#93c5fd"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            Lane #2
          </text>
          <g filter={`url(#${glowId})`}>
            <path d={eastPath} fill="none" stroke="#e10600" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d={westPath}
              fill="none"
              stroke="#ffb1ac"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 7"
              className="lane-dash"
            />
          </g>
          <text
            x={lane1Label[0]}
            y={lane1Label[1] - 12}
            textAnchor="middle"
            fill="#ffb1ac"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            Lane #1
          </text>
          <MovingTruck
            path={eastPath}
            x={eastTruck[0]}
            y={eastTruck[1]}
            duration="18s"
            begin="-6s"
            animate={!reduceMotion}
          />
          <MovingTruck
            path={westPath}
            x={westTruck[0]}
            y={westTruck[1]}
            duration="22s"
            begin="-12s"
            animate={!reduceMotion}
          />
          <MovingTruck
            path={lane2EastPath}
            x={lane2EastTruck[0]}
            y={lane2EastTruck[1]}
            duration="20s"
            begin="-4s"
            animate={!reduceMotion}
            color="#3b82f6"
          />
          <MovingTruck
            path={lane2WestPath}
            x={lane2WestTruck[0]}
            y={lane2WestTruck[1]}
            duration="24s"
            begin="-15s"
            animate={!reduceMotion}
            color="#3b82f6"
          />

          {locatedHubs.map((hub) => {
            const [x, y] = project(hub.lon, hub.lat);
            const active = selected === hub.city;
            return (
              <g key={hub.city}>
                {active ? <circle cx={x} cy={y} r="9" fill="#e10600" opacity="0.22" /> : null}
                <circle cx={x} cy={y} r={active ? 4.2 : 3.2} fill="#e10600" stroke="#fff" strokeWidth="1" />
              </g>
            );
          })}

          {(() => {
            const [x, y] = project(HQ.lon, HQ.lat);
            const active = selected === "hq";
            return (
              <g>
                {active ? <circle cx={x} cy={y} r="10" fill="#ffffff" opacity="0.12" /> : null}
                <circle cx={x} cy={y} r="4.5" fill="#101410" stroke="#f3f2ee" strokeWidth="1.4" />
                <circle cx={x} cy={y} r="1.6" fill="#e10600" />
                <text
                  x={x + 8}
                  y={y - 8}
                  fill="#f3f2ee"
                  fontSize="9"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {HQ.label}
                </text>
              </g>
            );
          })()}
        </svg>

        <aside className="border-t border-white/10 px-4 py-4 md:border-t-0 md:border-l md:px-5">
          <p className="eyebrow text-cream/50">Our locations</p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <LocationButton
                active={selected === "hq"}
                label="North Carolina"
                meta="Headquarters"
                onSelect={() => setSelected("hq")}
              />
            </li>
            {locatedHubs.map((hub) => (
              <li key={hub.city}>
                <LocationButton
                  active={selected === hub.city}
                  label={`${hub.city}, ${hub.state}`}
                  meta="Hub"
                  onSelect={() => setSelected(hub.city)}
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
            {selected === "hq" ? (
              <>
                <p className="text-sm font-semibold">North Carolina</p>
                <p className="mt-1 text-xs leading-5 text-cream/65">Headquarters · Based in North Carolina.</p>
              </>
            ) : activeHub ? (
              <>
                <p className="text-sm font-semibold">
                  {activeHub.city}, {activeHub.state}
                </p>
                <p className="mt-1 text-xs leading-5 text-cream/65">{activeHub.detail}</p>
              </>
            ) : null}
          </div>

          <div className="mt-3 rounded-xl border border-white/10 px-3 py-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">Motive GPS</p>
            <p className="mt-1 text-xs leading-5 text-cream/65">
              Loads are tracked with Motive GPS and visible to our dispatch team.
            </p>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 px-5 py-3 text-xs text-cream/70">
        <LegendSwatch>
          <span className="inline-block h-0.5 w-5 rounded-full bg-[#e10600]" aria-hidden />
          Lane #1 · Dallas, TX ↔ Southern California
        </LegendSwatch>
        <LegendSwatch>
          <span className="inline-block h-0.5 w-5 rounded-full bg-[#3b82f6]" aria-hidden />
          Lane #2 · Dallas, TX ↔ Charlotte, NC
        </LegendSwatch>
        <LegendSwatch>
          <span className="inline-block size-2.5 rounded-full border border-cream bg-ink" />
          Headquarters
        </LegendSwatch>
        <LegendSwatch>
          <span className="inline-block size-2.5 rounded-full bg-signal" />
          Hub
        </LegendSwatch>
      </div>
    </figure>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-cream/70 uppercase">
      {children}
    </span>
  );
}

function LocationButton({
  active,
  label,
  meta,
  onSelect,
}: {
  active: boolean;
  label: string;
  meta: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      aria-pressed={active}
      className={`w-full rounded-lg px-2.5 py-2 text-left transition-colors ${
        active ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <span className="block text-sm font-semibold">{label}</span>
      <span className="mt-0.5 block text-[11px] text-cream/55">{meta}</span>
    </button>
  );
}

function LegendSwatch({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2">{children}</span>;
}

function MovingTruck({
  path,
  x,
  y,
  duration,
  begin,
  animate,
  color = "#e10600",
}: {
  path: string;
  x: number;
  y: number;
  duration: string;
  begin: string;
  animate: boolean;
  color?: string;
}) {
  return (
    <g transform={animate ? undefined : `translate(${x} ${y})`}>
      {animate ? (
        <animateMotion dur={duration} begin={begin} repeatCount="indefinite" path={path} rotate="auto" />
      ) : null}
      <TruckGlyph color={color} />
    </g>
  );
}

function TruckGlyph({ color = "#e10600" }: { color?: string }) {
  return (
    <g>
      <rect x="-7" y="-2.3" width="9" height="4.6" rx="0.7" fill="#f3f2ee" stroke="#101410" strokeWidth="0.45" />
      <rect x="2.1" y="-2.3" width="3.8" height="4.6" rx="0.6" fill={color} stroke="#101410" strokeWidth="0.45" />
    </g>
  );
}
