/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    typecheck: {
      include: ["tests/**/*.test.ts"],
    },
  },
});
