// @flow
import React, {Fragment} from "react";

import FollowListItem from "./FollowListItem";

import type {Arrival as ArrivalType} from "../../types";

type Props = {
  arrivals: Array<ArrivalType>,
  errored: boolean
};

class FollowList extends React.Component<Props> {
  render() {
    return (
      <li>
        {this.props.errored && "No stop data available"}
        {!this.props.errored && (
          <Fragment>
            <p>Next Stops:</p>
            <ul>
              {this.props.arrivals.map((arrival, index) => (
                <FollowListItem arrival={arrival} key={index} />
              ))}
            </ul>
          </Fragment>
        )}
      </li>
    );
  }
}

export default FollowList;
