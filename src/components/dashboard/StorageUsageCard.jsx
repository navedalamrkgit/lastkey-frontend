import {
  Database,
  HardDrive,
  Sparkles,
} from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function StorageTooltip({
  active,
  payload,
}) {
  if (
    !active ||
    !payload?.length
  ) {
    return null;
  }

  const item = payload[0];

  return (
    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--surface-elevated)] px-3 py-2 shadow-[var(--card-shadow)]">
      <p className="text-xs font-bold text-[var(--text-primary)]">
        {item.name}
      </p>

      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
        {item.value} MB
      </p>
    </div>
  );
}

export default function StorageUsageCard({
  usedMb = 248,
  totalMb = 1024,
}) {
  const safeTotal =
    totalMb > 0
      ? totalMb
      : 1;

  const safeUsed = Math.min(
    Math.max(usedMb, 0),
    safeTotal,
  );

  const remaining =
    safeTotal - safeUsed;

  const percentage = Math.round(
    (safeUsed / safeTotal) * 100,
  );

  const chartData = [
    {
      name: "Used",
      value: safeUsed,
      color: "var(--accent-primary)",
    },
    {
      name: "Available",
      value: remaining,
      color: "var(--surface-inner)",
    },
  ];

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-accent)] hover:shadow-[var(--card-shadow-hover)]">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500" />

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl transition duration-500 group-hover:scale-125" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-700 shadow-sm dark:text-blue-300">
            <HardDrive className="h-5 w-5" />
          </span>

          <div>
            <h2 className="font-black tracking-[-0.02em] text-[var(--text-primary)]">
              Storage usage
            </h2>

            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              Encrypted vault capacity
            </p>
          </div>
        </div>

        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-black text-blue-700 dark:text-blue-300">
          {percentage}% used
        </span>
      </div>

      <div className="relative mt-6 grid items-center gap-5 sm:grid-cols-[160px_minmax(0,1fr)]">
        <div className="relative mx-auto h-40 w-40">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={68}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
                animationDuration={900}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip
                content={<StorageTooltip />}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-2xl font-black tracking-[-0.04em] text-transparent">
              {percentage}%
            </span>

            <span className="mt-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              consumed
            </span>
          </div>
        </div>

        <div>
          <p className="text-3xl font-black tracking-[-0.045em] text-[var(--text-primary)]">
            {safeUsed} MB
          </p>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            of {safeTotal} MB protected storage
          </p>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                  <Database className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  Documents
                </span>

                <span className="text-xs font-bold text-[var(--text-muted)]">
                  {safeUsed} MB
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-primary)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_16px_rgba(59,130,246,0.28)] transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--text-subtle)]">
              <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-300" />
              {remaining} MB remains available
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}