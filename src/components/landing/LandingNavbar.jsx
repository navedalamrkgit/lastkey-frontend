import {
  ArrowRight,
  BookOpenText,
  ChevronDown,
  FileText,
  KeyRound,
  Menu,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import Logo from "../branding/Logo";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/routePaths";

const navigationItems = [
  {
    label: "Features",
    path: ROUTES.FEATURES,
    activeClass:
      "text-blue-700",
    indicator:
      "from-blue-500 to-cyan-400",
  },
  {
    label: "Security",
    path: ROUTES.SECURITY,
    activeClass:
      "text-emerald-700",
    indicator:
      "from-emerald-500 to-teal-400",
  },
  {
    label: "Pricing",
    path: ROUTES.PRICING,
    activeClass:
      "text-violet-700",
    indicator:
      "from-violet-500 to-fuchsia-400",
  },
  {
    label: "About",
    path: ROUTES.ABOUT,
    activeClass:
      "text-orange-700",
    indicator:
      "from-amber-500 to-orange-500",
  },
];

const resourceItems = [
  {
    label: "Privacy policy",
    description:
      "Understand how LastKey handles personal and vault information.",
    path: ROUTES.PRIVACY,
    icon: ShieldCheck,
    iconClass:
      "from-emerald-500 to-teal-400",
    surface:
      "hover:border-emerald-200 hover:bg-emerald-50/70",
  },
  {
    label: "Terms of service",
    description:
      "Review the rules and responsibilities for using LastKey.",
    path: ROUTES.TERMS,
    icon: Scale,
    iconClass:
      "from-violet-500 to-fuchsia-400",
    surface:
      "hover:border-violet-200 hover:bg-violet-50/70",
  },
];

export default function LandingNavbar() {
  const location = useLocation();

  const {
    isAuthenticated,
  } = useAuth();

  const resourcesRef =
    useRef(null);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const [
    resourcesOpen,
    setResourcesOpen,
  ] = useState(false);

  const [
    isScrolled,
    setIsScrolled,
  ] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(
        window.scrollY > 12,
      );
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleOutsideClick(
      event,
    ) {
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(
          event.target,
        )
      ) {
        setResourcesOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setResourcesOpen(false);
        setMobileMenuOpen(false);
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
    if (!mobileMenuOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileMenuOpen]);

  const resourcesActive =
    location.pathname ===
      ROUTES.PRIVACY ||
    location.pathname ===
      ROUTES.TERMS;

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50",
          "border-b transition-all",
          "duration-300",
          isScrolled
            ? [
                "border-slate-200/80",
                "bg-white/82",
                "shadow-[0_14px_45px_-30px_rgba(15,23,42,0.42)]",
                "backdrop-blur-2xl",
              ].join(" ")
            : [
                "border-transparent",
                "bg-white/70",
                "backdrop-blur-xl",
              ].join(" "),
        ].join(" ")}
      >
        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-indigo-400/50
            to-transparent
          "
        />

        <div
          className="
            mx-auto flex
            h-[76px]
            max-w-[1440px]
            items-center
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="shrink-0">
            <Logo />
          </div>

          <nav
            className="
              ml-10 hidden
              items-center gap-1
              xl:flex
            "
            aria-label="Main navigation"
          >
            {navigationItems.map(
              (item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="group relative"
                >
                  {({
                    isActive,
                  }) => (
                    <span
                      className={[
                        "relative",
                        "flex h-11",
                        "items-center",
                        "rounded-2xl",
                        "px-4",
                        "text-sm",
                        "font-bold",
                        "transition-all",
                        "duration-300",
                        isActive
                          ? [
                              "bg-slate-100/90",
                              item.activeClass,
                            ].join(" ")
                          : [
                              "text-slate-600",
                              "hover:bg-slate-100/70",
                              "hover:text-slate-950",
                            ].join(" "),
                      ].join(" ")}
                    >
                      {item.label}

                      <span
                        className={[
                          "absolute",
                          "inset-x-4",
                          "-bottom-[17px]",
                          "h-[3px]",
                          "rounded-full",
                          "bg-gradient-to-r",
                          item.indicator,
                          "transition-all",
                          "duration-300",
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-50",
                        ].join(" ")}
                      />
                    </span>
                  )}
                </NavLink>
              ),
            )}

            <div
              ref={resourcesRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  setResourcesOpen(
                    (current) =>
                      !current,
                  );
                }}
                className={[
                  "group relative",
                  "flex h-11",
                  "items-center gap-1.5",
                  "rounded-2xl",
                  "px-4",
                  "text-sm font-bold",
                  "transition-all",
                  "duration-300",
                  resourcesActive ||
                  resourcesOpen
                    ? "bg-slate-100/90 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-950",
                ].join(" ")}
                aria-expanded={
                  resourcesOpen
                }
                aria-haspopup="menu"
              >
                Resources

                <ChevronDown
                  className={[
                    "h-4 w-4",
                    "transition-transform",
                    "duration-300",
                    resourcesOpen
                      ? "rotate-180"
                      : "",
                  ].join(" ")}
                />

                <span
                  className={[
                    "absolute",
                    "inset-x-4",
                    "-bottom-[17px]",
                    "h-[3px]",
                    "rounded-full",
                    "bg-gradient-to-r",
                    "from-indigo-500",
                    "to-fuchsia-500",
                    "transition-all",
                    "duration-300",
                    resourcesActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0",
                  ].join(" ")}
                />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      absolute
                      left-0
                      top-[calc(100%+16px)]
                      w-[360px]
                      overflow-hidden
                      rounded-[26px]
                      border border-slate-200/80
                      bg-white/95
                      p-2.5
                      shadow-[0_28px_80px_-30px_rgba(15,23,42,0.42)]
                      backdrop-blur-2xl
                    "
                    role="menu"
                  >
                    <div
                      className="
                        mb-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-indigo-50
                        via-violet-50
                        to-cyan-50
                        p-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="
                            flex h-10 w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-indigo-600
                            to-violet-600
                            text-white
                            shadow-lg
                            shadow-indigo-500/25
                          "
                        >
                          <BookOpenText className="h-5 w-5" />
                        </span>

                        <div>
                          <p className="text-sm font-black text-slate-950">
                            LastKey resources
                          </p>

                          <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                            Policies and information
                            about using the platform.
                          </p>
                        </div>
                      </div>
                    </div>

                    {resourceItems.map(
                      (item) => {
                        const Icon =
                          item.icon;

                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            role="menuitem"
                            className={[
                              "group/resource",
                              "flex gap-3",
                              "rounded-2xl",
                              "border border-transparent",
                              "p-3.5",
                              "transition-all",
                              "duration-300",
                              item.surface,
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "flex h-10",
                                "w-10 shrink-0",
                                "items-center",
                                "justify-center",
                                "rounded-xl",
                                "bg-gradient-to-br",
                                "text-white",
                                "shadow-md",
                                item.iconClass,
                              ].join(" ")}
                            >
                              <Icon className="h-4.5 w-4.5" />
                            </span>

                            <span className="min-w-0">
                              <span className="flex items-center gap-2 text-sm font-black text-slate-900">
                                {item.label}

                                <ArrowRight
                                  className="
                                    h-3.5 w-3.5
                                    opacity-0
                                    transition-all
                                    duration-300
                                    group-hover/resource:translate-x-1
                                    group-hover/resource:opacity-100
                                  "
                                />
                              </span>

                              <span className="mt-1 block text-xs leading-5 text-slate-500">
                                {
                                  item.description
                                }
                              </span>
                            </span>
                          </Link>
                        );
                      },
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div
            className="
              ml-auto hidden
              items-center gap-3
              lg:flex
            "
          >
            <div
              className="
                mr-1 hidden
                items-center gap-2
                rounded-full
                border border-emerald-200/80
                bg-emerald-50/80
                px-3.5 py-2
                text-xs font-bold
                text-emerald-700
                xl:flex
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute inline-flex
                    h-full w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-70
                  "
                />

                <span
                  className="
                    relative inline-flex
                    h-2 w-2
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>

              Secure by design
            </div>

            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD}>
                <Button
                  size="medium"
                  variant="dark"
                  rightIcon={ArrowRight}
                >
                  Open dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="
                    rounded-2xl
                    px-4 py-2.5
                    text-sm font-bold
                    text-slate-600
                    transition-all
                    duration-300
                    hover:bg-slate-100
                    hover:text-slate-950
                  "
                >
                  Sign in
                </Link>

                <Link to={ROUTES.REGISTER}>
                  <Button
                    size="medium"
                    rightIcon={ArrowRight}
                  >
                    Create free vault
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
            className="
              ml-auto flex
              h-11 w-11
              items-center
              justify-center
              rounded-2xl
              border border-slate-200
              bg-white/80
              text-slate-700
              shadow-sm
              transition-all
              hover:border-indigo-200
              hover:bg-indigo-50
              hover:text-indigo-700
              lg:hidden
            "
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <motion.button
              type="button"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="
                absolute inset-0
                bg-slate-950/45
                backdrop-blur-md
              "
              aria-label="Close navigation overlay"
            />

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 280,
              }}
              className="
                absolute right-0 top-0
                flex h-full
                w-full max-w-[430px]
                flex-col
                overflow-hidden
                border-l border-white/70
                bg-white/96
                shadow-2xl
                backdrop-blur-2xl
              "
            >
              <div
                className="
                  relative flex
                  h-[76px]
                  items-center
                  border-b
                  border-slate-200/80
                  px-5
                "
              >
                <div
                  className="
                    absolute
                    inset-x-0 top-0
                    h-px
                    bg-gradient-to-r
                    from-blue-500
                    via-violet-500
                    to-rose-500
                  "
                />

                <Logo />

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(
                      false,
                    );
                  }}
                  className="
                    ml-auto flex
                    h-11 w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50
                    text-slate-700
                    transition
                    hover:bg-rose-50
                    hover:text-rose-600
                  "
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className="
                  flex-1 overflow-y-auto
                  px-5 py-6
                "
              >
                <div
                  className="
                    relative mb-6
                    overflow-hidden
                    rounded-[26px]
                    bg-gradient-to-br
                    from-slate-950
                    via-indigo-950
                    to-violet-950
                    p-5
                    text-white
                  "
                >
                  <div
                    className="
                      absolute
                      -right-12 -top-12
                      h-36 w-36
                      rounded-full
                      bg-fuchsia-500/25
                      blur-3xl
                    "
                  />

                  <div className="relative">
                    <span
                      className="
                        flex h-11 w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-400
                        to-violet-500
                        text-white
                        shadow-lg
                      "
                    >
                      <KeyRound className="h-5 w-5" />
                    </span>

                    <p className="mt-4 text-lg font-black">
                      Protect your digital life
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-300">
                      One secure place for
                      documents, nominees and
                      emergency planning.
                    </p>
                  </div>
                </div>

                <nav
                  className="space-y-2"
                  aria-label="Mobile navigation"
                >
                  {navigationItems.map(
                    (item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({
                          isActive,
                        }) =>
                          [
                            "group",
                            "relative",
                            "flex",
                            "items-center",
                            "justify-between",
                            "overflow-hidden",
                            "rounded-2xl",
                            "border",
                            "px-4",
                            "py-4",
                            "text-base",
                            "font-black",
                            "transition-all",
                            "duration-300",
                            isActive
                              ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                              : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50",
                          ].join(" ")
                        }
                      >
                        {item.label}

                        <ArrowRight
                          className="
                            h-4 w-4
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />
                      </NavLink>
                    ),
                  )}
                </nav>

                <div
                  className="
                    my-6 h-px
                    bg-gradient-to-r
                    from-transparent
                    via-slate-200
                    to-transparent
                  "
                />

                <p
                  className="
                    px-2
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                  "
                >
                  Resources
                </p>

                <div className="mt-3 space-y-2">
                  {resourceItems.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="
                            flex items-center
                            gap-3
                            rounded-2xl
                            border border-slate-200/80
                            bg-white
                            p-3.5
                            shadow-sm
                            transition
                            hover:-translate-y-0.5
                            hover:shadow-md
                          "
                        >
                          <span
                            className={[
                              "flex h-10",
                              "w-10 shrink-0",
                              "items-center",
                              "justify-center",
                              "rounded-xl",
                              "bg-gradient-to-br",
                              "text-white",
                              item.iconClass,
                            ].join(" ")}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>

                          <span>
                            <span className="block text-sm font-black text-slate-900">
                              {item.label}
                            </span>

                            <span className="mt-0.5 block text-[11px] text-slate-500">
                              View document
                            </span>
                          </span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </div>

              <div
                className="
                  border-t border-slate-200
                  bg-slate-50/80
                  p-5
                "
              >
                <div
                  className="
                    mb-4 flex
                    items-center gap-2
                    rounded-xl
                    border border-emerald-200
                    bg-emerald-50
                    px-3 py-2.5
                    text-xs
                    font-bold
                    text-emerald-700
                  "
                >
                  <ShieldCheck className="h-4 w-4" />

                  Secure digital legacy platform
                </div>

                {isAuthenticated ? (
                  <Link
                    to={ROUTES.DASHBOARD}
                    className="block"
                  >
                    <Button
                      fullWidth
                      size="xl"
                      variant="dark"
                      rightIcon={ArrowRight}
                    >
                      Open dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to={ROUTES.REGISTER}
                      className="block"
                    >
                      <Button
                        fullWidth
                        size="xl"
                        rightIcon={
                          ArrowRight
                        }
                      >
                        Create free vault
                      </Button>
                    </Link>

                    <Link
                      to={ROUTES.LOGIN}
                      className="block"
                    >
                      <Button
                        fullWidth
                        variant="secondary"
                      >
                        Sign in
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}