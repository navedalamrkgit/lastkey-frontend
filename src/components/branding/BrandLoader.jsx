import { KeyRound } from "lucide-react";

export default function BrandLoader({
  size = "default",
}) {
  const loaderSize =
    size === "small"
      ? "h-8 w-8"
      : size === "large"
        ? "h-16 w-16"
        : "h-12 w-12";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div
          className={`${loaderSize} animate-spin rounded-full border-4 border-slate-200 border-t-blue-600`}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <KeyRound className="h-4 w-4 text-blue-600" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-800">
          LastKey
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Securing your digital legacy
        </p>
      </div>
    </div>
  );
}