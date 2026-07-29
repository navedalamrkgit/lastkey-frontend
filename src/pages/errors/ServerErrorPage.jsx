import {
  RefreshCw,
  ServerCrash,
} from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

export default function ServerErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-[32px] border border-amber-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-50 text-amber-600">
          <ServerCrash className="h-8 w-8" />
        </span>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
          Error 500
        </p>

        <h1 className="mt-3 text-3xl font-black text-slate-950">
          Server unavailable
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          The server could not complete the request. Try again or return to your dashboard.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            leftIcon={RefreshCw}
            onClick={() =>
              window.location.reload()
            }
          >
            Try again
          </Button>

          <Link
            to={ROUTES.DASHBOARD}
          >
            <Button variant="secondary">
              Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}