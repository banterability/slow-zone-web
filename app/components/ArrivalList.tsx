import { Fragment } from "react";

import { ArrivalListItem } from "~/components/ArrivalListItem";

import type { Arrival } from "slow-zone";

type Props = {
  arrivals: Arrival[];
};

export function ArrivalList({ arrivals }: Props) {
  if (arrivals.length === 0) {
    return (
      <>
        <div className="arrival-list-header">
          <h3 className="arrival-list-title">Arrivals</h3>
        </div>
        <p className="arrival-list-empty">
          No predictions currently available for this station :/
        </p>
      </>
    );
  }

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
      <div className="arrival-list-header">
        <h3 className="arrival-list-title">Arrivals</h3>
      </div>
      <ul className="arrival-list">
        {Object.values(arrivalsByStop).map((arrivals) => {
          const { id, description } = arrivals[0].station.stop;

          return (
            <Fragment key={id}>
              <li className="arrival-list-section-header">{description}</li>
              {arrivals.map((arrival: Arrival) => (
                <ArrivalListItem
                  key={`arrival:${arrival.route.run}`}
                  arrival={arrival}
                />
              ))}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
}
