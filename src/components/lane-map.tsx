"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Radio } from "lucide-react";
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

const KEY_CITIES: Array<{ name: string; lon: number; lat: number; dx: number; dy: number }> = [
  { name: "Los Angeles, CA", lon: -118.24, lat: 34.05, dx: -86, dy: 16 },
  { name: "Dallas, TX", lon: -96.8, lat: 32.78, dx: 10, dy: 18 },
  { name: "Charlotte, NC", lon: -80.84, lat: 35.23, dx: 10, dy: -8 },
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

const EASTBOUND: Array<[number, number]> = [
  [-118.24, 34.05],
  [-112.2, 34.55],
  [-106.4, 34.25],
  [-101.4, 33.55],
  [-96.8, 32.78],
];

const WESTBOUND: Array<[number, number]> = [
  [-96.8, 32.78],
  [-101.8, 32.15],
  [-107.0, 32.45],
  [-112.6, 33.15],
  [-118.24, 34.05],
];

/** Dallas to Charlotte, bowed north and passing near Rock Hill. */
const OCCASIONAL_EAST: Array<[number, number]> = [
  [-96.8, 32.78],
  [-92.4, 33.85],
  [-87.4, 34.45],
  [-83.6, 34.85],
  [-81.15, 35.05],
  [-80.84, 35.23],
];

/** Return trip, bowed south and passing just below Rock Hill. */
const OCCASIONAL_WEST: Array<[number, number]> = [
  [-80.84, 35.23],
  [-81.25, 34.5],
  [-84.8, 33.55],
  [-89.6, 33.05],
  [-93.8, 32.7],
  [-96.8, 32.78],
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

function legOf(phase: number) {
  const u = ((phase % 1) + 1) % 1;
  if (u < 0.5) return { leg: "out" as const, t: u * 2 };
  return { leg: "back" as const, t: (u - 0.5) * 2 };
}

function poseOnLeg(points: Array<[number, number]>, distanceRatio: number) {
  const [x, y] = pointAlong(points, distanceRatio);
  const aheadRatio = Math.min(1, distanceRatio + 0.02);
  const behindRatio = Math.max(0, distanceRatio - 0.02);
  const [aheadX, aheadY] = pointAlong(points, aheadRatio > distanceRatio ? aheadRatio : behindRatio);
  const dx = aheadRatio > distanceRatio ? aheadX - x : x - pointAlong(points, behindRatio)[0];
  const dy = aheadRatio > distanceRatio ? aheadY - y : y - pointAlong(points, behindRatio)[1];
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, angle };
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

const LANE_MILES = { 1: 1400, 2: 1030 } as const;

/** Round trips. `out` is the first leg; `back` returns on the paired line. `phase` is 0–1 around the loop. */
const ROUND_TRIPS = {
  1: {
    out: WESTBOUND,
    back: EASTBOUND,
    outD: westPath,
    backD: eastPath,
    color: "#e10600",
    trail: "#ffe4e1",
  },
  2: {
    out: OCCASIONAL_EAST,
    back: OCCASIONAL_WEST,
    outD: lane2EastPath,
    backD: lane2WestPath,
    color: "#3b82f6",
    trail: "#dbeafe",
  },
} as const;

const TRACKED_TRUCKS = [
  {
    id: 1,
    lane: 1 as const,
    from: "Dallas, TX",
    to: "Los Angeles, CA",
    progress: 0.12,
    phase: 0.06,
    legSeconds: 24,
    speed: 58,
    pingOffset: 2,
  },
  {
    id: 2,
    lane: 1 as const,
    from: "Los Angeles, CA",
    to: "Dallas, TX",
    progress: 0.38,
    phase: 0.69,
    legSeconds: 26,
    speed: 64,
    pingOffset: 5,
  },
  {
    id: 3,
    lane: 1 as const,
    from: "Dallas, TX",
    to: "Los Angeles, CA",
    progress: 0.67,
    phase: 0.335,
    legSeconds: 22,
    speed: 61,
    pingOffset: 0,
  },
  {
    id: 4,
    lane: 1 as const,
    from: "Los Angeles, CA",
    to: "Dallas, TX",
    progress: 0.85,
    phase: 0.925,
    legSeconds: 28,
    speed: 55,
    pingOffset: 4,
  },
  {
    id: 5,
    lane: 2 as const,
    from: "Dallas, TX",
    to: "Charlotte, NC",
    progress: 0.22,
    phase: 0.11,
    legSeconds: 25,
    speed: 66,
    pingOffset: 1,
  },
  {
    id: 6,
    lane: 2 as const,
    from: "Charlotte, NC",
    to: "Dallas, TX",
    progress: 0.49,
    phase: 0.745,
    legSeconds: 23,
    speed: 59,
    pingOffset: 6,
  },
  {
    id: 7,
    lane: 2 as const,
    from: "Dallas, TX",
    to: "Charlotte, NC",
    progress: 0.81,
    phase: 0.405,
    legSeconds: 27,
    speed: 68,
    pingOffset: 3,
  },
];

const TRAIL_SPAN = 0.16;

type MeasureKey = "1-out" | "1-back" | "2-out" | "2-back";

export function LaneMap() {
  const [selected, setSelected] = useState<Selection>("hq");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [truckIndex, setTruckIndex] = useState(0);
  const [progresses, setProgresses] = useState(() => TRACKED_TRUCKS.map((truck) => truck.progress));
  const [pingTick, setPingTick] = useState(0);
  const measurePaths = useRef<Partial<Record<MeasureKey, SVGPathElement | null>>>({});
  const truckNodes = useRef<Array<SVGGElement | null>>([]);
  const trailNodes = useRef<Array<SVGPathElement | null>>([]);
  const rawId = useId().replace(/:/g, "");
  const dotsId = `${rawId}-dots`;
  const glowId = `${rawId}-glow`;
  const haloId = `${rawId}-halo`;
  const clipId = `${rawId}-us`;
  const activeHub = locatedHubs.find((hub) => hub.city === selected);
  const activeTruck = TRACKED_TRUCKS[truckIndex];
  const activeProgress = progresses[truckIndex] ?? activeTruck.progress;
  const laneMiles = LANE_MILES[activeTruck.lane];
  const milesLeft = Math.round(laneMiles * (1 - activeProgress));
  const percentComplete = Math.round(activeProgress * 100);
  const pingSeconds = ((pingTick + activeTruck.pingOffset) % 8) + 1;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPingTick((tick) => tick + 1);
      setProgresses((current) => {
        if (reduceMotion) return current;
        return current.map((progress, index) => {
          const truck = TRACKED_TRUCKS[index];
          const step = (truck.speed / LANE_MILES[truck.lane]) * 0.04;
          return (progress + step) % 1;
        });
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const place = (index: number, leg: "out" | "back", legT: number) => {
      const truck = TRACKED_TRUCKS[index];
      const trip = ROUND_TRIPS[truck.lane];
      const key: MeasureKey = `${truck.lane}-${leg}`;
      const path = measurePaths.current[key];
      const node = truckNodes.current[index];
      const trail = trailNodes.current[index];
      if (!path || !node) return;
      const length = path.getTotalLength();
      if (!length) return;
      const distance = Math.min(Math.max(legT, 0), 1) * length;
      const point = path.getPointAtLength(distance);
      const ahead = path.getPointAtLength(Math.min(length, distance + 12));
      const behind = path.getPointAtLength(Math.max(0, distance - 12));
      const facingForward = ahead.x !== point.x || ahead.y !== point.y;
      const from = facingForward ? point : behind;
      const to = facingForward ? ahead : point;
      const angle = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
      node.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
      if (!trail) return;
      trail.setAttribute("d", leg === "out" ? trip.outD : trip.backD);
      const start = Math.max(0, legT - TRAIL_SPAN);
      const span = Math.max(legT - start, 0);
      trail.setAttribute("stroke-dasharray", `${span} 1`);
      trail.setAttribute("stroke-dashoffset", `${-start}`);
      trail.setAttribute("opacity", span < 0.012 ? "0" : "1");
    };

    const applyPhase = (index: number, phase: number) => {
      const { leg, t } = legOf(phase);
      place(index, leg, t);
    };

    if (reduceMotion) {
      TRACKED_TRUCKS.forEach((truck, index) => applyPhase(index, truck.phase));
      return;
    }

    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - started) / 1000;
      TRACKED_TRUCKS.forEach((truck, index) => {
        const cycle = truck.legSeconds * 2;
        applyPhase(index, (truck.phase + elapsed / cycle) % 1);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  function showTruck(nextIndex: number) {
    const count = TRACKED_TRUCKS.length;
    setTruckIndex(((nextIndex % count) + count) % count);
  }

  return (
    <figure className="overflow-hidden rounded-[1.6rem] bg-[#101410] text-cream">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 md:px-6 md:pt-6">
        <figcaption className="max-w-md text-sm text-cream/70">
          Round trips from Dallas to Los Angeles and Charlotte.
        </figcaption>
        <div className="flex flex-wrap gap-2">
          <Chip>{hubs.length} hubs</Chip>
          <Chip>2 core lanes</Chip>
          <Chip>48 states served</Chip>
        </div>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1.5fr)_18.5rem]">
        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          role="img"
          aria-label="Map of the contiguous United States with key cities Los Angeles, Dallas, and Charlotte. A red line runs between Los Angeles and Dallas. A blue line runs between Dallas and Charlotte."
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
            <filter id={haloId} x="-180%" y="-180%" width="460%" height="460%">
              <feGaussianBlur stdDeviation="2.6" />
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
          {( ["1-out", "1-back", "2-out", "2-back"] as const).map((key) => {
            const [lane, leg] = key.split("-") as ["1" | "2", "out" | "back"];
            const trip = ROUND_TRIPS[lane];
            return (
              <path
                key={key}
                ref={(node) => {
                  measurePaths.current[key] = node;
                }}
                d={leg === "out" ? trip.outD : trip.backD}
                fill="none"
                stroke="none"
              />
            );
          })}
          {TRACKED_TRUCKS.map((truck, index) => {
            const trip = ROUND_TRIPS[truck.lane];
            const { leg, t } = legOf(truck.phase);
            const start = Math.max(0, t - TRAIL_SPAN);
            const span = t - start;
            return (
              <path
                key={`trail-${truck.id}`}
                ref={(node) => {
                  trailNodes.current[index] = node;
                }}
                d={leg === "out" ? trip.outD : trip.backD}
                fill="none"
                stroke={trip.trail}
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={`${span} 1`}
                strokeDashoffset={-start}
                opacity={span < 0.012 ? 0 : 1}
                filter={`url(#${truck.lane === 1 ? glowId : `${glowId}-blue`})`}
                pointerEvents="none"
              />
            );
          })}
          {TRACKED_TRUCKS.map((truck, index) => {
            const trip = ROUND_TRIPS[truck.lane];
            const { leg, t } = legOf(truck.phase);
            const points = leg === "out" ? trip.out : trip.back;
            const pose = poseOnLeg(points, t);
            const active = index === truckIndex;
            const label = `Truck ${String(truck.id).padStart(2, "0")}, ${truck.from} to ${truck.to}`;
            return (
              <g
                key={truck.id}
                ref={(node) => {
                  truckNodes.current[index] = node;
                }}
                transform={`translate(${pose.x} ${pose.y}) rotate(${pose.angle})`}
                tabIndex={0}
                role="button"
                aria-label={label}
                aria-pressed={active}
                className="cursor-pointer outline-none"
                onClick={() => showTruck(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    showTruck(index);
                  }
                }}
              >
                <circle r="7.5" fill={trip.color} opacity="0.55" filter={`url(#${haloId})`} />
                {active ? (
                  <circle
                    r="11"
                    fill={trip.color}
                    opacity="0.28"
                    className={reduceMotion ? undefined : "truck-pulse"}
                  />
                ) : null}
                <circle r="11" fill="transparent" />
                <TruckGlyph color={trip.color} />
              </g>
            );
          })}

          {KEY_CITIES.map((city) => {
            const [x, y] = project(city.lon, city.lat);
            return (
              <g key={city.name}>
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill="#ffffff"
                  opacity="0.28"
                  className={reduceMotion ? undefined : "truck-pulse"}
                />
                <circle cx={x} cy={y} r="6" fill="#f3f2ee" opacity="0.45" />
                <circle cx={x} cy={y} r="3.4" fill="#ffffff" />
                <text
                  x={x + city.dx}
                  y={y + city.dy}
                  fill="#f3f2ee"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {city.name}
                </text>
              </g>
            );
          })}

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

          <TrackingCard
            truckNumber={activeTruck.id}
            route={`${activeTruck.from} → ${activeTruck.to}`}
            percent={percentComplete}
            laneMiles={laneMiles}
            milesLeft={milesLeft}
            speed={activeTruck.speed}
            pingLabel={`${pingSeconds}s ago`}
            barColor={activeTruck.lane === 1 ? "#e10600" : "#3b82f6"}
            onPrevious={() => showTruck(truckIndex - 1)}
            onNext={() => showTruck(truckIndex + 1)}
          />
          <p className="mt-3 flex items-start gap-2 text-[11px] leading-4 text-cream/45">
            <Radio className="mt-0.5 size-3.5 shrink-0 text-signal" aria-hidden />
            <span>
              Loads are GPS-tracked with Motive and visible to our dispatch team. Trucks and
              telemetry shown here are illustrative.
            </span>
          </p>
        </aside>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 px-5 py-3 text-xs text-cream/70">
        <LegendSwatch>
          <span className="inline-block h-0.5 w-5 rounded-full bg-[#e10600]" aria-hidden />
          Dallas, TX ↔ Los Angeles, CA
        </LegendSwatch>
        <LegendSwatch>
          <span className="inline-block h-0.5 w-5 rounded-full bg-[#3b82f6]" aria-hidden />
          Dallas, TX ↔ Charlotte, NC
        </LegendSwatch>
        <LegendSwatch>
          <span className="inline-block size-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" aria-hidden />
          Key city
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

function TrackingCard({
  truckNumber,
  route,
  percent,
  laneMiles,
  milesLeft,
  speed,
  pingLabel,
  barColor,
  onPrevious,
  onNext,
}: {
  truckNumber: number;
  route: string;
  percent: number;
  laneMiles: number;
  milesLeft: number;
  speed: number;
  pingLabel: string;
  barColor: string;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const label = `Truck ${String(truckNumber).padStart(2, "0")}`;
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-[#141a16] px-3 py-3">
      <div className="flex items-center gap-2">
        <span className="size-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
        <p className="text-xs font-semibold tracking-wide">Motive GPS</p>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-base font-semibold tracking-tight">{label} · In transit</p>
          <p className="mt-0.5 text-xs text-cream/65">{route}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous truck"
            className="inline-flex size-9 items-center justify-center rounded-md border border-white/15 text-cream hover:bg-white/10"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next truck"
            className="inline-flex size-9 items-center justify-center rounded-md border border-white/15 text-cream hover:bg-white/10"
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`${label} progress along the lane`}
      >
        <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: barColor }} />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-cream/60">
        <span>{percent}% complete</span>
        <span>{laneMiles.toLocaleString("en-US")} mi lane</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <StatTile label="Speed" value={`${speed} mph`} />
        <StatTile label="Miles left" value={milesLeft.toLocaleString("en-US")} />
        <StatTile label="Last ping" value={pingLabel} />
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/25 px-1.5 py-2 text-center">
      <p className="text-[9px] tracking-[0.12em] text-cream/45 uppercase">{label}</p>
      <p className="mt-1 text-sm font-semibold tracking-tight">{value}</p>
    </div>
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
