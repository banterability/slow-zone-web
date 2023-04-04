import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { cacheHeader } from "pretty-cache-header";
import { useState } from "react";

import { ListFilter } from "~/components/ListFilter";
import { StationListItem } from "~/components/StationListItem";
import { ORDERED_STATIONS } from "~/data/stations";

import type { Line } from "~/types/line";
import type { Station } from "~/types/station";

export const config = { runtime: "edge" };

export function loader() {
  return json(
    { stations: ORDERED_STATIONS },
    {
      headers: {
        "Cache-Control": cacheHeader({
          public: true,
          sMaxage: "59s",
          staleWhileRevalidate: "5m",
        }),
      },
    }
  );
}

export function headers({ loaderHeaders }: { loaderHeaders: Headers }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}

export default function StationList() {
  const { stations } = useLoaderData<typeof loader>();
  const allLines: Line[] = [
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

  const toggleLine = (line: Line) => {
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
          onLineClick={(line) => toggleLine(line)}
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

export function ErrorBoundary() {
  return <div className="error-container">Station Error</div>;
}
