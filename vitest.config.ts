import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: [
      { find: "@", replacement: new URL("./src/", import.meta.url).pathname },
    ],
    /* Use global to avoid globals imports (describe, test, expect): */
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
  },
});
