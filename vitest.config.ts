import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ["app/**/*.test.ts"],
    env: {
      // Production runs with TZ=America/Chicago (set in Vercel). slow-zone parses CTA wall-clock times in the
      // process zone, so the tests have to run in the same zone to agree with production.
      TZ: "America/Chicago",
      CTA_API_KEY: "test-cta-key",
      SLOW_ZONE_APP_SECRET: "test-app-secret",
    },
  },
});
