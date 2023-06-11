import { Outlet } from "@remix-run/react";

import styles from "~/styles/stations.css";

export function meta() {
  return [
    {
      title: "Stations • Slow Zone",
    },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function StationsRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">Station Error</div>;
}
