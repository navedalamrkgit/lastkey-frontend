import {
  Component,
} from "react";
import {
  AlertTriangle,
  Home,
  RefreshCw,
} from "lucide-react";

import { ROUTES } from "../../utils/routePaths";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(
    error,
  ) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(
    error,
    errorInfo,
  ) {
    if (import.meta.env.DEV) {
      console.error(
        "Unhandled React error:",
        error,
        errorInfo,
      );
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.assign(
      ROUTES.DASHBOARD,
    );
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <section className="w-full max-w-lg rounded-[32px] border border-red-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600">
            <AlertTriangle className="h-8 w-8" />
          </span>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            Application error
          </p>

          <h1 className="mt-3 text-3xl font-black text-slate-950">
            Something went wrong
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            LastKey encountered an unexpected interface error. Your account data has not been changed.
          </p>

          {import.meta.env.DEV &&
            this.state.error?.message && (
              <div className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-left">
                <code className="text-xs leading-5 text-red-300">
                  {
                    this.state.error
                      .message
                  }
                </code>
              </div>
            )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={
                this.handleReload
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />

              Reload application
            </button>

            <button
              type="button"
              onClick={
                this.handleHome
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Home className="h-4 w-4" />

              Go to dashboard
            </button>
          </div>
        </section>
      </main>
    );
  }
}