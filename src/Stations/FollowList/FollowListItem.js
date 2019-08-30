// @flow
import React from "react";

import type {Arrival as ArrivalType} from "../../types";

import "../../css/FollowListItem.scss";

type Props = {
  arrival: ArrivalType
};

const FollowListItem = ({
  arrival: {
    prediction: {arrivalMinutes, arrivalString},
    station: {name: stationName}
  }
}: Props) => (
  <li className="follow-list-item">
    <span className="follow-list-item__minutes">{arrivalMinutes} m</span>
    <span className="follow-list-item__headsign">{stationName}</span>
    <span className="follow-list-item__time">
      {arrivalString.replace(/\s([ap])\.m\./, "$1")}
    </span>
  </li>
);

export default FollowListItem;
