import { type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { withSentry, captureRemixErrorBoundaryError } from "@sentry/remix";

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

export const meta: MetaFunction = () => {
  return [{ title: "Slow Zone" }];
};

function App() {
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
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    // i can't know how to hear anymore about 404s!
  } else {
    captureRemixErrorBoundaryError(error);
  }
  return <div>Something went wrong</div>;
};

export default withSentry(App);
