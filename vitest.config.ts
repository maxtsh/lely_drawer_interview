import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: [
      { find: "@", replacement: new URL("./src/", import.meta.url).pathname },
    ],
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    css: false,
  },
});
