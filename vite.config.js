import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],

    server: {
      host: true,
      port: 5173,
      strictPort: true,
      open: false,
    },

    preview: {
      host: true,
      port: 4173,
      strictPort: true,
    },

    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: mode !== "production",
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
    },

    define: {
      __APP_ENV__: JSON.stringify(
        env.VITE_APP_ENV || mode
      ),
    },
  };
});