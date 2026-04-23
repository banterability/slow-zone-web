import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter } from "@sentry/react-router";
import { defineConfig } from "vite";

export default defineConfig((config) => ({
  resolve: {
    tsconfigPaths: true,
  },

  plugins: [
    reactRouter(),
    sentryReactRouter(
      {
        org: "banterability",
        project: "slow-zone",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
      config,
    ),
  ],

  optimizeDeps: {
    exclude: ["@sentry/react-router"],
  },
}));
