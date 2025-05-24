import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    fileParallelism: false,
    poolOptions: {
      singleThread: true,
    },
    env: {
      ...config({ path: "./.env.integration" }).parsed,
    },
  },
});
