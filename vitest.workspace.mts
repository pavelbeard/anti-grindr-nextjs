import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vitest.config.mts",
    test: {
      name: "int",
      include: ["__tests__/integration/**/*.test.ts"],
      exclude: ["node_modules", "dist"],
      environment: "jsdom",
    },
    base: "./__tests__/integration",
  },
  {
    extends: "./vitest.config.mts",
    test: {
      name: "unit",
      include: ["lib/**/*.test.ts"],
      exclude: ["node_modules", "dist"],
      environment: "jsdom",
    },
    resolve: {
      alias: {
        lib: "./app/lib",
      },
    },
  },
]);
