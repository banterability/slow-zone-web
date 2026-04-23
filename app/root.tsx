import { captureException } from "@sentry/react-router";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import styles from "~/styles/global.css?url";

import Footer from "./components/Footer";
import Header from "./components/Header";

import type { Route } from "./+types/root";

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

export const meta: Route.MetaFunction = () => {
  return [{ title: "Slow Zone" }];
};

export default function App() {
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
      </body>
    </html>
  );
}

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  if (isRouteErrorResponse(error) && error.status === 404) {
    // i can't know how to hear anymore about 404s!
  } else {
    captureException(error);
  }
  return <div>Something went wrong</div>;
};
