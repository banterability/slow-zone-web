// @flow
import React from "react";

import FollowListItem from "./FollowListItem";
import type {Arrival as ArrivalType} from "../../types";

import "../../css/FollowList.scss";

type Props = {
  arrivals: Array<ArrivalType>,
  currentStopId: number,
  errored: boolean,
};

const FollowList = ({arrivals, currentStopId, errored}: Props) => (
  <li>
    {errored ? (
      <div className="follow-list__error">No stop data available</div>
    ) : (
      <>
        <ul className="follow-list">
          {arrivals.map((arrival, index) => (
            <FollowListItem
              arrival={arrival}
              currentStopId={currentStopId}
              key={index}
            />
          ))}
        </ul>
      </>
    )}
  </li>
);

export default FollowList;
