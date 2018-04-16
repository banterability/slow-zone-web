// @flow
import React from "react";

import FollowListItem from "./FollowListItem";

import type {Arrival as ArrivalType} from "../../types";

type Props = {
  arrivals: Array<ArrivalType>
};

class FollowList extends React.Component<Props> {
  render() {
    return (
      <li>
        <p>Next Stops:</p>
        <ul>
          {this.props.arrivals.map((arrival, index) => (
            <FollowListItem arrival={arrival} key={index} />
          ))}
        </ul>
      </li>
    );
  }
}

export default FollowList;
