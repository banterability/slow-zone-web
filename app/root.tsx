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
import { json, type V2_MetaFunction } from "@vercel/remix";

import styles from "~/styles/global.css";

import Footer from "./components/Footer";
import Header from "./components/Header";

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

export const meta: V2_MetaFunction = () => {
  return [{ title: "Slow Zone" }];
};

export function loader() {
  return json({
    ENV: {
      GOOGLE_MAPS_STATIC_API_KEY: process.env.GOOGLE_MAPS_STATIC_API_KEY,
      SENTRY_DSN: process.env.SENTRY_DSN,
    },
  });
}

function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="Slow Zone" />
        <meta name="theme-color" content="#000000" />
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
