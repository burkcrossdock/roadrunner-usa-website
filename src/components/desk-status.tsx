"use client";

import { useEffect, useState } from "react";

type Status = { open: boolean | null; label: string };

function statusAt(now: Date): Status {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const minutes = hour * 60 + minute;

  if (weekday === "Sun") {
    return { open: null, label: "Sunday hours aren’t posted" };
  }
  if (weekday === "Sat") {
    const open = minutes >= 9 * 60 + 30 && minutes < 16 * 60;
    return {
      open,
      label: open ? "Desk is open" : "Desk is closed",
    };
  }
  const open = minutes >= 7 * 60 && minutes < 23 * 60;
  return { open, label: open ? "Desk is open" : "Desk is closed" };
}

export function DeskStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(statusAt(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!status) {
    return <span className="text-cream/80">Desk · Eastern time</span>;
  }

  const dot =
    status.open === null ? "bg-cream/50" : status.open ? "bg-emerald-400" : "bg-cream/40";

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
      <span>{status.label}</span>
    </span>
  );
}
