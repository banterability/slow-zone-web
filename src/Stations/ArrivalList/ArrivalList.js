// @flow
import React from "react";

import ArrivalListItem from "./ArrivalListItem";
import type {Arrival as ArrivalType} from "../../types";

import "../../css/ArrivalList.css";

type Props = {
  arrivals: Array<ArrivalType>,
  loading: boolean,
  refresh: () => void
};

const ArrivalList = ({arrivals, loading, refresh}: Props) => (
  <>
    <div className="arrival-list--header">
      <h3 className="arrival-list--title">Arrivals</h3>
      {loading ? <p>loading...</p> : <button onClick={refresh}>Refresh</button>}
    </div>

    <ul className="arrival-list">
      {arrivals.map((arrival, index) => (
        <ArrivalListItem key={index} {...arrival} />
      ))}
    </ul>
  </>
);

export default ArrivalList;
