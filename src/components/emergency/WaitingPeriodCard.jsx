import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Hourglass,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

function getTimeParts(targetDate) {
  if (!targetDate) {
    return null;
  }

  const target =
    new Date(targetDate).getTime();

  if (Number.isNaN(target)) {
    return null;
  }

  const remaining =
    Math.max(target - Date.now(), 0);

  const totalSeconds =
    Math.floor(remaining / 1000);

  return {
    complete: remaining <= 0,
    days: Math.floor(
      totalSeconds / 86400,
    ),
    hours: Math.floor(
      (totalSeconds % 86400) / 3600,
    ),
    minutes: Math.floor(
      (totalSeconds % 3600) / 60,
    ),
    seconds: totalSeconds % 60,
    remaining,
  };
}

function formatReleaseDate(value) {
  if (!value) {
    return "Release time unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Release time unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

function TimeUnit({
  value,
  label,
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3 py-4 text-center">
      <p className="text-xl font-black tabular-nums tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
        {String(value).padStart(
          2,
          "0",
        )}
      </p>

      <p className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
        {label}
      </p>
    </div>
  );
}

export default function WaitingPeriodCard({
  waitingPeriodHours = 0,
  releaseAt,
}) {
  const [
    timeLeft,
    setTimeLeft,
  ] = useState(() =>
    getTimeParts(releaseAt),
  );

  useEffect(() => {
    setTimeLeft(
      getTimeParts(releaseAt),
    );

    if (!releaseAt) {
      return undefined;
    }

    const timer = window.setInterval(
      () => {
        setTimeLeft(
          getTimeParts(releaseAt),
        );
      },
      1000,
    );

    return () =>
      window.clearInterval(timer);
  }, [releaseAt]);

  const progress = useMemo(() => {
    if (
      !releaseAt ||
      !waitingPeriodHours ||
      !timeLeft
    ) {
      return 0;
    }

    const totalDuration =
      Number(waitingPeriodHours) *
      60 *
      60 *
      1000;

    if (
      !Number.isFinite(
        totalDuration,
      ) ||
      totalDuration <= 0
    ) {
      return 0;
    }

    return Math.min(
      Math.max(
        ((totalDuration -
          timeLeft.remaining) /
          totalDuration) *
          100,
        0,
      ),
      100,
    );
  }, [
    releaseAt,
    waitingPeriodHours,
    timeLeft,
  ]);

  const isComplete =
    timeLeft?.complete === true;

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] sm:p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span
              className={[
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
                isComplete
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
              ].join(" ")}
            >
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Hourglass className="h-5 w-5" />
              )}
            </span>

            <div>
              <p
                className={[
                  "text-[10px] font-black uppercase tracking-[0.14em]",
                  isComplete
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-amber-700 dark:text-amber-300",
                ].join(" ")}
              >
                {isComplete
                  ? "Waiting period complete"
                  : "Protected waiting period"}
              </p>

              <h2 className="mt-1 text-lg font-black tracking-[-0.025em] text-[var(--text-primary)]">
                {isComplete
                  ? "Access is ready for release"
                  : "Release countdown"}
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                {isComplete
                  ? "The mandatory security window has ended. The release workflow can now continue."
                  : "LastKey is observing the mandatory waiting period before protected documents can be released."}
              </p>
            </div>
          </div>

          <span
            className={[
              "hidden w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] sm:inline-flex",
              isComplete
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
            ].join(" ")}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isComplete
              ? "Ready"
              : "Active"}
          </span>
        </div>

        {!isComplete &&
          timeLeft && (
            <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
              <TimeUnit
                value={timeLeft.days}
                label="Days"
              />

              <TimeUnit
                value={timeLeft.hours}
                label="Hours"
              />

              <TimeUnit
                value={timeLeft.minutes}
                label="Minutes"
              />

              <TimeUnit
                value={timeLeft.seconds}
                label="Seconds"
              />
            </div>
          )}

        {!timeLeft &&
          !isComplete && (
            <div className="mt-6 rounded-2xl border border-dashed border-[var(--border-secondary)] bg-[var(--surface-inner)] px-4 py-7 text-center">
              <Clock3 className="mx-auto h-7 w-7 text-[var(--text-subtle)]" />

              <p className="mt-3 text-sm font-black text-[var(--text-primary)]">
                Countdown unavailable
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                The release timestamp has not been assigned yet.
              </p>
            </div>
          )}

        {isComplete && (
          <div className="mt-6 flex items-center gap-4 rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-[var(--surface-primary)] text-emerald-700 shadow-sm dark:text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-black text-[var(--text-primary)]">
                Security hold completed
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                The request has completed its configured waiting period.
              </p>
            </div>
          </div>
        )}

        <div className="mt-5">
          <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--text-subtle)]">
            <span>
              Waiting progress
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--surface-inner)]">
            <div
              className={[
                "h-full rounded-full transition-all duration-700",
                isComplete
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                  : "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500",
              ].join(" ")}
              style={{
                width: `${isComplete ? 100 : progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
            <div className="flex items-center gap-2 text-[var(--text-subtle)]">
              <Clock3 className="h-4 w-4" />

              <p className="text-[10px] font-black uppercase tracking-[0.12em]">
                Waiting window
              </p>
            </div>

            <p className="mt-2 text-sm font-black text-[var(--text-primary)]">
              {Number(
                waitingPeriodHours,
              ) || 0}{" "}
              hours
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
            <div className="flex items-center gap-2 text-[var(--text-subtle)]">
              <CalendarClock className="h-4 w-4" />

              <p className="text-[10px] font-black uppercase tracking-[0.12em]">
                Scheduled release
              </p>
            </div>

            <p className="mt-2 text-sm font-black leading-5 text-[var(--text-primary)]">
              {formatReleaseDate(
                releaseAt,
              )}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700 dark:text-blue-300" />

          <p className="text-xs leading-5 text-[var(--text-muted)]">
            This security delay helps prevent fraudulent claims and gives authorized parties time to review or stop an incorrect release.
          </p>
        </div>
      </div>
    </section>
  );
}