import { reactRouter } from "@react-router/dev/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    sourcemap: "hidden",
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "banterability",
      project: "slow-zone",
    }),
  ],
});
