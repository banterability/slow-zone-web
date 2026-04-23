import { Outlet } from "react-router";

import styles from "~/styles/stations.css?url";

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
  return (
    <div className="error-container">Couldn&apos;t load this station.</div>
  );
}
