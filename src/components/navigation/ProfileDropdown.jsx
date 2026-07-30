import {
  ChevronRight,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { getInitials } from "../../utils/getInitials";
import { ROUTES } from "../../utils/routePaths";

function resolveProfileImageUrl(imageUrl) {
  if (!imageUrl) {
    return null;
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("blob:") ||
    imageUrl.startsWith("data:")
  ) {
    return imageUrl;
  }

  const backendBaseUrl = (
    import.meta.env.VITE_BACKEND_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ||
    "http://localhost:8080"
  ).replace(/\/+$/, "");

  const normalizedPath = imageUrl.startsWith("/")
    ? imageUrl
    : `/${imageUrl}`;

  return `${backendBaseUrl}${normalizedPath}`;
}

export default function ProfileDropdown({ onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [imageFailed, setImageFailed] = useState(false);

  const initials =
    getInitials(user?.firstName, user?.lastName) || "U";

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "LastKey User";

  const profileImageUrl = resolveProfileImageUrl(user?.profileImageUrl);
  const showProfileImage = Boolean(profileImageUrl) && !imageFailed;

  async function handleLogout() {
    await logout();
    onClose?.();
    navigate(ROUTES.LOGIN, { replace: true });
  }

  const links = [
    {
      label: "My profile",
      description: "Personal information",
      path: ROUTES.PROFILE,
      icon: UserRound,
    },
    {
      label: "Security center",
      description: "Sessions and login activity",
      path: ROUTES.SECURITY_CENTER,
      icon: ShieldCheck,
    },
    {
      label: "Account settings",
      description: "Preferences and privacy",
      path: ROUTES.SETTINGS,
      icon: Settings,
    },
  ];

  return (
    <div className="absolute right-0 top-[calc(100%+12px)] z-40 w-[calc(100vw-2rem)] max-w-xs overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-600 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20">
            {showProfileImage ? (
              <img
                src={profileImageUrl}
                alt={fullName}
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              initials
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-slate-950">
              {fullName}
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-500">
              {user?.email}
            </p>

            <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              {user?.emailVerified ? "Verified" : "Verification pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                <Icon className="h-4.5 w-4.5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-slate-800">
                  {item.label}
                </span>

                <span className="mt-0.5 block text-[11px] text-slate-500">
                  {item.description}
                </span>
              </span>

              <ChevronRight className="h-4 w-4 text-slate-300" />
            </Link>
          );
        })}
      </div>

      <div className="border-t border-slate-100 p-2">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl p-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <LogOut className="h-4.5 w-4.5" />
          </span>

          Sign out securely
        </button>
      </div>
    </div>
  );
}