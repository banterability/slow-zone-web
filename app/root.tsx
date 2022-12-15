import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { withSentry } from "@sentry/remix";

import Header from "./components/Header";
import styles from "~/styles/global.css";
import Footer from "./components/Footer";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    { rel: "shortcut icon", href: "/favicon.png" },
    { rel: "apple-touch-icon", href: "/AppIcon.png" },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "dns-prefetch", href: "https://maps.googleapis.com" },
    { rel: "apple-mobile-web-app-status-bar-style", href: "black-translucent" },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Slow Zone",
  viewport: "width=device-width,initial-scale=1",
  "apple-mobile-web-app-title": "Slow Zone",
  "theme-color": "#000000",
});

export function loader() {
  return json({
    ENV: {
      GOOGLE_MAPS_STATIC_API_KEY: process.env.GOOGLE_MAPS_STATIC_API_KEY,
      SENTRY_DSN: process.env.SENTRY_DSN,
    },
  });
}

function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
      </body>
    </html>
  );
}

export default withSentry(App);
