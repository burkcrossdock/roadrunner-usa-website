import { MapPin } from "lucide-react";
import { hubs } from "@/config/site";
import { cn } from "@/lib/utils";

export function HubCards({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-4 md:grid-cols-3", className)}>
      {hubs.map((hub) => (
        <li key={hub.city} className="rounded-2xl border border-line bg-paper p-5">
          <MapPin className="size-5 text-signal" aria-hidden />
          <p className="mt-3 text-2xl font-extrabold tracking-tight">{hub.city}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{hub.state}</p>
        </li>
      ))}
    </ul>
  );
}
