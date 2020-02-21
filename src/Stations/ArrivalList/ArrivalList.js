// @flow
import React, {Fragment} from "react";

import ArrivalListItem from "./ArrivalListItem";
import ArrivalListSectionHeader from "./ArrivalListSectionHeader";
import type {Arrival as ArrivalType} from "../../types";

import "../../css/ArrivalList.scss";

type Props = {
  arrivals: Array<ArrivalType>,
  loading: boolean,
  refresh: () => void
};

const ArrivalListStopSection = ({arrivals, stopDescription}) => {
  return (
    <Fragment>
      <ArrivalListSectionHeader title={stopDescription} />

      {arrivals.map((arrival: ArrivalType) => (
        <ArrivalListItem
          key={`arrival-list-item:${arrival.route.class}:${arrival.route.run}`}
          {...arrival}
        />
      ))}
    </Fragment>
  );
};

const ArrivalList = ({arrivals, loading, refresh}: Props) => {
  const arrivalsByStop: {[number]: Array<ArrivalType>} = arrivals.reduce(
    (memo, arrival) => {
      const stopId = arrival.station.stop.id;

      if (memo[stopId]) {
        memo[stopId].push(arrival);
      } else {
        memo[stopId] = [arrival];
      }

      return memo;
    },
    {}
  );

  return (
    <>
      <div className="arrival-list__header">
        <h3 className="arrival-list__title">Arrivals</h3>
        {loading ? (
          <p>loading...</p>
        ) : (
          <button className="arrival-list__refresh" onClick={refresh}>
            Refresh
          </button>
        )}
      </div>

      <ul className="arrival-list">
        {(Object.values(arrivalsByStop): any).map(
          (arrivals: Array<ArrivalType>) => {
            const {id, description} = arrivals[0].station.stop;

            return (
              <ArrivalListStopSection
                key={`arrival-list-section:${id}`}
                stopDescription={description}
                arrivals={arrivals}
              />
            );
          }
        )}
      </ul>
    </>
  );
};

export default ArrivalList;
