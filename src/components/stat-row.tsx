import { stats } from "@/config/site";

export function StatRow() {
  return (
    <div className="border-y border-line bg-paper">
      <div className="mx-auto grid max-w-[1180px] grid-cols-3 md:divide-x md:divide-line">
        {stats.map((stat) => (
          <div key={stat.id} className="reveal-item border-b border-line px-5 py-7 md:border-b-0 md:px-7">
            <p className="font-mono text-[11px] tracking-[0.16em] text-signal uppercase">
              {stat.detail}
            </p>
            <p className="mt-3 text-5xl font-extrabold tracking-[-0.06em] text-ink md:text-6xl">
              {stat.display}
            </p>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
