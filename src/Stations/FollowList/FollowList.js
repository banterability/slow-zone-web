// @flow
import React from "react";

import FollowListItem from "./FollowListItem";
import type {Arrival as ArrivalType} from "../../types";

import "../../css/FollowList.css";

type Props = {
  arrivals: Array<ArrivalType>,
  errored: boolean
};

const FollowList = ({arrivals, errored}: Props) => (
  <li>
    {errored ? (
      <div className="follow-list__error">No stop data available</div>
    ) : (
      <>
        <ul className="follow-list">
          {arrivals.map((arrival, index) => (
            <FollowListItem arrival={arrival} key={index} />
          ))}
        </ul>
      </>
    )}
  </li>
);

export default FollowList;
