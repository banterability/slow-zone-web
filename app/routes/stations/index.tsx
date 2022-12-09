import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { useState } from "react";
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
    <li>
      <Link className="station-list__item" to={`/stations/${id}`}>
        <p className="station-list__item__name">{name}</p>
        <Lines lines={lines} />
      </Link>
    </li>
  );
}

function ListFilter({ lines, visibleLines, onLineClick }) {
  return (
    <Lines lines={lines} activeLines={visibleLines} onLineClick={onLineClick} />
  );
}

export default function StationList() {
  const { stations } = useLoaderData();
  const allLines = [
    "blue",
    "brown",
    "green",
    "orange",
    "pink",
    "purple",
    "red",
    "yellow",
  ];
  const [visibleLines, setVisibleLines] = useState(allLines);

  const filteredStations = stations.filter((station: Station) => {
    return station.lines
      .map((line) => {
        return visibleLines.includes(line);
      })
      .some((el) => Boolean(el));
  });

  const toggleLine = (line: string) => {
    if (visibleLines.includes(line)) {
      let idx = visibleLines.indexOf(line);
      visibleLines.splice(idx, 1);
      setVisibleLines([...visibleLines]);
    } else {
      visibleLines.push(line);
      setVisibleLines([...visibleLines]);
    }
  };

  return (
    <>
      <div className="line-filter-container">
        <h4>Filter by line: </h4>
        <ListFilter
          lines={allLines}
          visibleLines={visibleLines}
          onLineClick={(line: string) => toggleLine(line)}
        />
        <button
          disabled={visibleLines.length === 8}
          onClick={() => setVisibleLines(allLines)}
        >
          Show All
        </button>
      </div>
      <ul className="station-list">
        {filteredStations.map((station: Station) => {
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
