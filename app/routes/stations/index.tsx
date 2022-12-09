import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { Lines } from "~/components/Lines";

import { ORDERED_STATIONS } from "~/data/stations";
import { Line, Station } from "~/types/station";

export function loader() {
  return json({ stations: ORDERED_STATIONS });
}

export function meta() {
  return {
    title: "Stations",
  };
}

export function StationListItem({
  id,
  name,
  lines,
}: {
  id: number;
  name: string;
  lines: [Line];
}) {
  return (
    <li className="station-list__item">
      <Link className="station-list__item__name" to={`/stations/${id}`}>
        {name}
      </Link>
      <Lines lines={lines} />
    </li>
  );
}

export default function StationList() {
  const { stations } = useLoaderData();

  return (
    <>
      <h2>Station list</h2>
      <ul className="station-list">
        {stations.map((station: Station) => {
          const { id, name, lines } = station;
          return <StationListItem key={id} id={id} name={name} lines={lines} />;
        })}
      </ul>
    </>
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
