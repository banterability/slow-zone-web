import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ["app/**/*.test.ts"],
    env: {
      CTA_API_KEY: "test-cta-key",
      SLOW_ZONE_APP_SECRET: "test-app-secret",
    },
  },
});
