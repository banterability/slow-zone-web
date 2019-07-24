// @flow
import React from "react";

import ArrivalListItem from "./ArrivalListItem";
import type {Arrival as ArrivalType} from "../../types";

import "./ArrivalList.css";

type Props = {
  arrivals: Array<ArrivalType>
};

const ArrivalList = ({arrivals}: Props) => (
  <>
    <h3>Arrivals</h3>

    <ul className="arrival-list">
      {arrivals.map((arrival, index) => (
        <ArrivalListItem key={index} {...arrival} />
      ))}
    </ul>
  </>
);

export default ArrivalList;
