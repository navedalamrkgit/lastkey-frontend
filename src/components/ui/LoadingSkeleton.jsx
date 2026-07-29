export default function LoadingSkeleton({
  className = "",
}) {
  return (
    <div
      className={[
        "shimmer rounded-2xl",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}