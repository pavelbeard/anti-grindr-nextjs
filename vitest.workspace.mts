import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
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
  {
    extends: "./vitest.config.int.mts",
    test: {
      name: "int",
      include: ["__tests__/integration/**/*.test.ts"],
      exclude: ["node_modules", "dist"],
      setupFiles: ["__tests__/integration/helpers/setup.ts"],
    },
  },
  {
    extends: "./vitest.config.mts",
    test: {
      name: "ui",
      include: ["__tests__/ui/**/*.test.tsx"],
      exclude: ["node_modules", "dist"],
      environment: "jsdom",
    },
    resolve: {
      alias: {
        lib: "./app/lib",
        components: "./app/components",
      },
    },
  },
]);
