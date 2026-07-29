import {
  Toaster,
} from "react-hot-toast";

import ErrorBoundary from "./components/error/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const {
    isDark,
  } = useTheme();

  const toastStyle = {
    borderRadius: "16px",

    border: isDark
      ? "1px solid #2b3f5d"
      : "1px solid #e4eaf3",

    background: isDark
      ? "rgba(23, 35, 58, 0.96)"
      : "rgba(255, 255, 255, 0.96)",

    color: isDark
      ? "#f8fafc"
      : "#101828",

    padding: "14px 16px",
    fontSize: "14px",
    fontWeight: "600",

    boxShadow: isDark
      ? "0 18px 45px rgba(2, 8, 23, 0.38)"
      : "0 18px 45px rgba(71, 85, 105, 0.16)",

    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  };

  return (
    <ErrorBoundary>
      <AppRoutes />

      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 92,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,
          style: toastStyle,

          success: {
            duration: 3500,

            iconTheme: {
              primary: isDark
                ? "#34d399"
                : "#059669",

              secondary: isDark
                ? "#0f172a"
                : "#ffffff",
            },

            style: {
              ...toastStyle,

              border: isDark
                ? "1px solid rgba(52, 211, 153, 0.26)"
                : "1px solid rgba(5, 150, 105, 0.2)",
            },
          },

          error: {
            duration: 5000,

            iconTheme: {
              primary: isDark
                ? "#fb7185"
                : "#e11d48",

              secondary: isDark
                ? "#0f172a"
                : "#ffffff",
            },

            style: {
              ...toastStyle,

              border: isDark
                ? "1px solid rgba(251, 113, 133, 0.28)"
                : "1px solid rgba(225, 29, 72, 0.2)",
            },
          },

          loading: {
            style: {
              ...toastStyle,

              border: isDark
                ? "1px solid rgba(96, 165, 250, 0.28)"
                : "1px solid rgba(37, 99, 235, 0.2)",
            },

            iconTheme: {
              primary: isDark
                ? "#60a5fa"
                : "#2563eb",

              secondary: isDark
                ? "#17233a"
                : "#ffffff",
            },
          },
        }}
      />
    </ErrorBoundary>
  );
}