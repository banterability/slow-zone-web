import { Fragment } from "react";

import type { Arrival } from "~/types/arrival";

type Props = {
  arrivals: Arrival[];
};

export function ArrivalList({ arrivals }: Props) {
  const arrivalsByStop = arrivals.reduce(
    (memo: { [key: string]: Arrival[] }, arrival: Arrival) => {
      const stopId = arrival.station.stop.id;

      if (memo[stopId]) {
        memo[stopId].push(arrival);
      } else {
        memo[stopId] = [arrival];
      }

      return memo;
    },
    {},
  );

  return (
    <>
      <div className="arrival-list__header">
        <h3 className="arrival-list__title">Arrivals</h3>
      </div>
      <ul className="arrival-list">
        {Object.values(arrivalsByStop).map((arrivals) => {
          const { id, description } = arrivals[0].station.stop;

          return (
            <Fragment key={id}>
              <li className="arrival-list__section-header">{description}</li>
              {arrivals.map((arrival: Arrival) => {
                const {
                  destination: { name },
                  prediction: { arrivalString, arrivalMinutes },
                  route,
                } = arrival;

                return (
                  <li
                    className={`arrival-list-item cta-${route.class}`}
                    key={`arrival:${route.run}`}
                  >
                    <span className="arrival-list-item__eta">
                      {arrivalMinutes} min
                    </span>
                    <span className="arrival-list-item__headsign">{name}</span>
                    <span className="arrival-list-item__time">
                      {arrivalString}
                    </span>
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
}
