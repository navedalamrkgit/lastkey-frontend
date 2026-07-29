import {
  ArrowLeft,
  ShieldX,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

export default function ForbiddenPage() {
  const navigate =
    useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-[32px] border border-red-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600">
          <ShieldX className="h-8 w-8" />
        </span>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          Error 403
        </p>

        <h1 className="mt-3 text-3xl font-black text-slate-950">
          Access denied
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          Your account does not have permission to access this page or perform this action.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="secondary"
            leftIcon={ArrowLeft}
            onClick={() =>
              navigate(-1)
            }
          >
            Go back
          </Button>

          <Link
            to={ROUTES.DASHBOARD}
          >
            <Button>
              Open dashboard
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}