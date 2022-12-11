import { Outlet, useCatch } from "@remix-run/react";

import styles from "~/styles/stations.css";

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

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div className="error-container">Unknown station</div>;
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary() {
  return <div className="error-container">Station Error</div>;
}
