import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild",
    cssMinify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        compact: true,
        minifyInternalExports: true,
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: new URL("./src/", import.meta.url).pathname },
    ],
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
});
