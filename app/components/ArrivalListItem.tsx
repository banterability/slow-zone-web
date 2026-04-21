import { Fragment, useId, useState } from "react";
import { useFetcher } from "react-router";

import type { loader as followLoader } from "~/routes/follow.$runId";
import type { Arrival } from "~/types/arrival";

type Props = {
  arrival: Arrival;
};

export function ArrivalListItem({ arrival }: Props) {
  const {
    destination: { name },
    prediction: { arrivalString, arrivalMinutes },
    route,
    station: {
      stop: { id: stopId },
    },
  } = arrival;

  const [expanded, setExpanded] = useState(false);
  const fetcher = useFetcher<typeof followLoader>();
  const contentId = useId();

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      fetcher.load(`/follow/${route.run}`);
    }
  }

  return (
    <Fragment>
      <li className="arrival-list-item-wrapper">
        <button
          type="button"
          className={`arrival-list-item cta-${route.class}`}
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={contentId}
        >
          <span className="arrival-list-item-eta">{arrivalMinutes} min</span>
          <span className="arrival-list-item-headsign">{name}</span>
          <span className="arrival-list-item-time">{arrivalString}</span>
        </button>
      </li>
      {expanded ? (
        <li id={contentId} className="follow-list-wrapper">
          {fetcher.state !== "idle" ? (
            <div className="follow-list-loading">Loading…</div>
          ) : fetcher.data && !fetcher.data.error ? (
            <ul className="follow-list">
              {fetcher.data.arrivals.map((stop, index) => {
                const isCurrentStop = stop.station.stop.id === stopId;
                return (
                  <li
                    key={`${stop.station.stop.id}:${index}`}
                    className={
                      isCurrentStop
                        ? "follow-list-item follow-list-item-selected"
                        : "follow-list-item"
                    }
                    aria-current={isCurrentStop ? "location" : undefined}
                  >
                    <span className="follow-list-item-minutes">
                      {stop.prediction.arrivalMinutes} min
                    </span>
                    <span className="follow-list-item-name">
                      {stop.station.name}
                    </span>
                    <span className="follow-list-item-time">
                      {stop.prediction.arrivalString}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="follow-list-error">No stop data available</div>
          )}
        </li>
      ) : null}
    </Fragment>
  );
}
