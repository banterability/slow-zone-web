// @flow
import React, {Fragment} from "react";

import ArrivalListItem from "./ArrivalListItem";
import type {Arrival as ArrivalType} from "../../types";

import "./ArrivalList.css";

type Props = {
  arrivals: Array<ArrivalType>
};

const ArrivalList = ({arrivals}: Props) => (
  <Fragment>
    <h3>Arrivals</h3>

    <ul className="arrival-list">
      {arrivals.map((arrival, index) => (
        <ArrivalListItem key={index} {...arrival} />
      ))}
    </ul>
  </Fragment>
);

export default ArrivalList;
