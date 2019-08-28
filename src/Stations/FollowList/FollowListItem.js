// @flow
import React from "react";

import type {Arrival as ArrivalType} from "../../types";

import "./FollowListItem.css";

type Props = {
  arrival: ArrivalType
};

const FollowListItem = ({arrival}: Props) => (
  <li className="follow-list-item">
    <span>{arrival.prediction.arrivalMinutes}m</span>
    <span>{arrival.station.name}</span>
    <span>{arrival.prediction.arrivalString}</span>
  </li>
);

export default FollowListItem;
