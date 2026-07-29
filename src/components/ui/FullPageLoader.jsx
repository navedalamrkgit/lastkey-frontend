import BrandLoader from "../branding/BrandLoader";

export default function FullPageLoader({
  message = "Preparing your secure vault...",
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="rounded-3xl border border-slate-200 bg-white px-12 py-10 shadow-xl shadow-slate-200/60">
        <BrandLoader />

        <p className="mt-5 text-center text-sm text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}