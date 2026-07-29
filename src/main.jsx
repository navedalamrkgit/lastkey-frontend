import {
  StrictMode,
} from "react";
import {
  createRoot,
} from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
import {
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  ReactQueryDevtools,
} from "@tanstack/react-query-devtools";

import App from "./App";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  ThemeProvider,
} from "./context/ThemeContext";

import queryClient from "./config/queryClient";

import "./index.css";

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element was not found.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider
        client={queryClient}
      >
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>

        {import.meta.env.DEV && (
          <ReactQueryDevtools
            initialIsOpen={false}
          />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);