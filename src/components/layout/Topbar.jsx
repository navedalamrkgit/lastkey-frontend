import {
  Bell,
  ChevronDown,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useQuery,
} from "@tanstack/react-query";
import {
  useNavigate,
} from "react-router-dom";

import NotificationDropdown from "../navigation/NotificationDropdown";
import ProfileDropdown from "../navigation/ProfileDropdown";

import {
  profileApi,
} from "../../api/profileApi";
import {
  useNotificationCount,
} from "../../hooks/useNotificationCount";
import {
  useAuth,
} from "../../hooks/useAuth";
import {
  useTheme,
} from "../../hooks/useTheme";

import {
  getInitials,
} from "../../utils/getInitials";
import {
  ROUTES,
} from "../../utils/routePaths";

function resolveProfileImageUrl(
  imageUrl,
) {
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

  const backendBaseUrl =
    (
      import.meta.env
        .VITE_BACKEND_BASE_URL ||
      "http://localhost:8080"
    ).replace(/\/+$/, "");

  const normalizedPath =
    imageUrl.startsWith("/")
      ? imageUrl
      : `/${imageUrl}`;

  return `${backendBaseUrl}${normalizedPath}`;
}

export default function Topbar({
  onOpenSidebar,
}) {
  const navigate =
    useNavigate();

  const {
    user: authenticatedUser,
  } = useAuth();

  const {
    isDark,
    setTheme,
  } = useTheme();

  const unreadCountQuery =
    useNotificationCount();

  const profileQuery =
    useQuery({
      queryKey: ["profile"],

      queryFn: async () => {
        const response =
          await profileApi.getProfile();

        return response.data;
      },

      staleTime:
        5 * 60 * 1000,
    });

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const [
    mobileSearchOpen,
    setMobileSearchOpen,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    avatarFailed,
    setAvatarFailed,
  ] = useState(false);

  const notificationRef =
    useRef(null);

  const profileRef =
    useRef(null);

  const desktopSearchInputRef =
    useRef(null);

  const mobileSearchInputRef =
    useRef(null);

  const user =
    profileQuery.data ||
    authenticatedUser;

  const initials =
    getInitials(
      user?.firstName,
      user?.lastName,
    ) || "U";

  const unreadCount =
    unreadCountQuery.data || 0;

  const fullName = [
    user?.firstName,
    user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const displayName =
    fullName ||
    "LastKey User";

  const displayRole =
    user?.role
      ?.replace(
        /^ROLE_/,
        "",
      )
      ?.replaceAll(
        "_",
        " ",
      ) || "User";

  const profileImageUrl =
    resolveProfileImageUrl(
      user?.profileImageUrl,
    );

  useEffect(() => {
    setAvatarFailed(false);
  }, [profileImageUrl]);

  useEffect(() => {
    function handleOutsideClick(
      event,
    ) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target,
        )
      ) {
        setNotificationOpen(
          false,
        );
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target,
        )
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(
      event,
    ) {
      if (
        event.key === "Escape"
      ) {
        setNotificationOpen(
          false,
        );

        setProfileOpen(false);

        setMobileSearchOpen(
          false,
        );
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  useEffect(() => {
    if (
      mobileSearchOpen &&
      mobileSearchInputRef.current
    ) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    function handleSearchShortcut(event) {
      const activeElement =
        document.activeElement;

      const isTyping =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT" ||
        activeElement?.isContentEditable;

      if (
        event.key === "/" &&
        !isTyping
      ) {
        event.preventDefault();

        if (
          window.matchMedia(
            "(min-width: 640px)",
          ).matches
        ) {
          desktopSearchInputRef.current?.focus();
        } else {
          setMobileSearchOpen(true);
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleSearchShortcut,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleSearchShortcut,
      );
    };
  }, []);

  const performSearch = useCallback(() => {
    const normalizedSearch =
      search.trim();

    if (!normalizedSearch) {
      desktopSearchInputRef.current?.focus();
      return;
    }

    navigate(
      `${ROUTES.DOCUMENTS}?search=${encodeURIComponent(
        normalizedSearch,
      )}`,
    );

    setMobileSearchOpen(false);
  }, [navigate, search]);

  function handleSearchSubmit(
    event,
  ) {
    event.preventDefault();
    performSearch();
  }

  function toggleNotifications() {
    setNotificationOpen(
      (current) => !current,
    );

    setProfileOpen(false);
  }

  function toggleProfile() {
    setProfileOpen(
      (current) => !current,
    );

    setNotificationOpen(false);
  }

  const showProfileImage =
    Boolean(profileImageUrl) &&
    !avatarFailed;

  return (
    <header className="premium-topbar sticky top-0 z-30 overflow-visible">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/55 to-transparent" />

      <div className="relative flex min-h-[78px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="theme-icon-button lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden min-w-0 max-w-[560px] flex-1 sm:block"
        >
          <div className="group relative rounded-2xl transition-transform duration-200 focus-within:-translate-y-0.5">
            <Search className="theme-search-icon pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />

            <input
              ref={desktopSearchInputRef}
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search your vault..."
              aria-label="Search documents"
              className="theme-search-input h-12 w-full rounded-2xl pl-12 pr-24 text-sm font-semibold outline-none"
            />

            <button
              type="submit"
              disabled={!search.trim()}
              className="absolute right-2 top-1/2 flex h-9 -translate-y-1/2 items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 text-xs font-extrabold text-blue-600 transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-default disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              aria-label="Submit search"
            >
              <span className="hidden lg:inline">
                Search
              </span>

              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="min-w-0 flex-1 sm:hidden">
          <div className="flex items-center gap-2">
            <span className="theme-brand-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="theme-heading truncate text-base font-black tracking-tight">
                Last
                <span className="theme-accent-text">
                  Key
                </span>
              </p>

              <p className="theme-muted truncate text-[10px] font-bold uppercase tracking-[0.14em]">
                Secure workspace
              </p>
            </div>
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen(
                true,
              );

              setNotificationOpen(
                false,
              );

              setProfileOpen(
                false,
              );
            }}
            className="theme-icon-button sm:hidden"
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>

          <div
            className="theme-mode-switch"
            role="group"
            aria-label="Choose appearance"
          >
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={[
                "theme-mode-option",
                !isDark
                  ? "theme-mode-option-active"
                  : "",
              ].join(" ")}
              aria-pressed={!isDark}
              aria-label="Use light mode"
              title="Light mode"
            >
              <Sun className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={[
                "theme-mode-option",
                isDark
                  ? "theme-mode-option-active"
                  : "",
              ].join(" ")}
              aria-pressed={isDark}
              aria-label="Use dark mode"
              title="Dark mode"
            >
              <Moon className="h-4 w-4" />
            </button>
          </div>

          <div className="theme-secure-status hidden items-center gap-2 rounded-2xl px-3.5 py-2.5 xl:flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            <span className="text-xs font-bold">
              Vault secure
            </span>
          </div>

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={
                toggleNotifications
              }
              className={[
                "theme-icon-button relative",
                notificationOpen
                  ? "theme-button-active"
                  : "",
              ].join(" ")}
              aria-expanded={
                notificationOpen
              }
              aria-haspopup="menu"
              aria-label={`Open notifications${
                unreadCount > 0
                  ? `, ${unreadCount} unread`
                  : ""
              }`}
            >
              <Bell className="h-5 w-5" />

              {unreadCount > 0 && (
                <span className="theme-notification-badge absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-black leading-none text-white">
                  {unreadCount >
                  99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </button>

            {notificationOpen && (
              <NotificationDropdown
                onClose={() =>
                  setNotificationOpen(
                    false,
                  )
                }
              />
            )}
          </div>

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={
                toggleProfile
              }
              className={[
                "theme-profile-button group flex min-h-12 items-center gap-2 rounded-2xl p-1.5 sm:gap-3 sm:pr-3",
                profileOpen
                  ? "theme-button-active"
                  : "",
              ].join(" ")}
              aria-expanded={
                profileOpen
              }
              aria-haspopup="menu"
            >
              <span className="theme-avatar relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl text-xs font-black text-white transition duration-300 group-hover:scale-105">
                {showProfileImage ? (
                  <img
                    src={
                      profileImageUrl
                    }
                    alt={
                      displayName
                    }
                    onError={() =>
                      setAvatarFailed(
                        true,
                      )
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}

                <span className="theme-online-indicator absolute -bottom-0.5 -right-0.5 z-10 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <span className="hidden min-w-0 text-left md:block">
                <span className="theme-heading block max-w-[150px] truncate text-xs font-bold">
                  {displayName}
                </span>

                <span className="theme-muted mt-0.5 block max-w-[150px] truncate text-[10px] font-bold uppercase tracking-[0.12em]">
                  {displayRole}
                </span>
              </span>

              <ChevronDown
                className={[
                  "theme-muted hidden h-4 w-4 transition-transform duration-300 sm:block",
                  profileOpen
                    ? "rotate-180"
                    : "",
                ].join(" ")}
              />
            </button>

            {profileOpen && (
              <ProfileDropdown
                onClose={() =>
                  setProfileOpen(
                    false,
                  )
                }
              />
            )}
          </div>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="theme-mobile-search-panel px-4 pb-4 pt-3 sm:hidden">
          <form
            onSubmit={
              handleSearchSubmit
            }
            className="flex items-center gap-2"
          >
            <div className="relative min-w-0 flex-1">
              <Search className="theme-search-icon pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />

              <input
                ref={
                  mobileSearchInputRef
                }
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target
                      .value,
                  )
                }
                placeholder="Search your vault..."
                aria-label="Search documents"
                className="theme-search-input h-11 w-full rounded-xl pl-11 pr-4 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!search.trim()}
              className="theme-icon-button disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Submit search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen(
                  false,
                );

                setSearch("");
              }}
              className="theme-icon-button"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}