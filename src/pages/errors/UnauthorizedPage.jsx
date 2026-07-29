import {
  KeyRound,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <KeyRound className="h-8 w-8" />
        </span>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Error 401
        </p>

        <h1 className="mt-3 text-3xl font-black text-slate-950">
          Sign in required
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          Your session is unavailable or has expired. Sign in again to continue securely.
        </p>

        <Link
          to={ROUTES.LOGIN}
          className="mt-8 inline-block"
        >
          <Button leftIcon={LogIn}>
            Go to login
          </Button>
        </Link>
      </section>
    </main>
  );
}