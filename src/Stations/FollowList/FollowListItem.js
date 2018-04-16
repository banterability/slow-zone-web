// @flow
import React from "react";

import type {Arrival as ArrivalType} from "../../types";

type Props = {
  arrival: ArrivalType
};

const FollowListItem = ({arrival}: Props) => (
  <li>{`${arrival.prediction.arrivalMinutes} – ${arrival.station.name}`}</li>
);

export default FollowListItem;
