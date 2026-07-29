import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "lastkey-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem(
    THEME_STORAGE_KEY,
  );

  if (
    savedTheme === "light" ||
    savedTheme === "dark"
  ) {
    return savedTheme;
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return prefersDark
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] = useState(
    getInitialTheme,
  );

  useEffect(() => {
    const root =
      document.documentElement;

    root.dataset.theme = theme;

    root.classList.toggle(
      "dark",
      theme === "dark",
    );

    root.style.colorScheme = theme;

    localStorage.setItem(
      THEME_STORAGE_KEY,
      theme,
    );
  }, [theme]);

  const toggleTheme =
    useCallback(() => {
      setTheme((currentTheme) =>
        currentTheme === "dark"
          ? "light"
          : "dark",
      );
    }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      isLight: theme === "light",
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
}