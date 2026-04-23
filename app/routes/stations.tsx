import { captureException } from "@sentry/react-router";
import { isRouteErrorResponse, Outlet, useRouteError } from "react-router";

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
  const error = useRouteError();
  if (!(isRouteErrorResponse(error) && error.status === 404)) {
    captureException(error);
  }
  return (
    <div className="error-container">Couldn&apos;t load this station.</div>
  );
}
