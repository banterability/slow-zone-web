// @flow
import React from "react";
import classnames from "classnames";

import type {Arrival as ArrivalType} from "../../types";

import "../../css/FollowListItem.scss";

type Props = {
  arrival: ArrivalType,
  currentStopId: number,
};

const FollowListItem = ({
  arrival: {
    prediction: {arrivalMinutes, arrivalString},
    station: {
      id: stationId,
      name: stationName,
      stop: {id: stopId},
    },
  },
  currentStopId,
}: Props) => {
  const isCurrentStop = stopId === currentStopId;

  return (
    <li
      className={classnames("follow-list-item", {
        "follow-list-item--selected": isCurrentStop,
      })}
    >
      <span className="follow-list-item__minutes">{arrivalMinutes} m</span>
      <span className="follow-list-item__headsign">{stationName}</span>
      <span className="follow-list-item__time">
        {arrivalString.replace(/\s([ap])\.m\./, "$1")}
      </span>
    </li>
  );
};

export default FollowListItem;
