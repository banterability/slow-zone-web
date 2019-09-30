// @flow
import React, {Fragment} from "react";
import {groupBy} from "lodash-es";

import ArrivalListItem from "./ArrivalListItem";
import ArrivalListSectionHeader from "./ArrivalListSectionHeader";
import type {Arrival as ArrivalType} from "../../types";

import "../../css/ArrivalList.scss";

type Props = {
  arrivals: Array<ArrivalType>,
  loading: boolean,
  refresh: () => void
};

const ArrivalList = ({arrivals, loading, refresh}: Props) => {
  const arrivalsByStop = groupBy(arrivals, arrival => arrival.station.stop.id);

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
        {Object.values(arrivalsByStop).map(arrivalGroup => {
          const {id, description} = arrivalGroup[0].station.stop;

          return (
            <Fragment key={`arrival-list:section:${id}`}>
              <ArrivalListSectionHeader title={description} />

              {arrivalGroup.map((arrival, index) => (
                <ArrivalListItem key={index} {...arrival} />
              ))}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default ArrivalList;
