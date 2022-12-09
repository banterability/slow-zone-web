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
import Header from "./components/Header";
import styles from "~/styles/global.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "icon",
      href: "/favicon.png",
    },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Slow Zone",
  viewport: "width=device-width,initial-scale=1",
});

export function loader() {
  return json({
    ENV: {
      GOOGLE_MAPS_STATIC_API_KEY: process.env.GOOGLE_MAPS_STATIC_API_KEY,
    },
  });
}

export default function App() {
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
