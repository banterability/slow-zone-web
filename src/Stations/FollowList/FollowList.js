// @flow
import React from "react";

import FollowListItem from "./FollowListItem";
import type {Arrival as ArrivalType} from "../../types";

import "./FollowList.css";

type Props = {
  arrivals: Array<ArrivalType>,
  errored: boolean
};

class FollowList extends React.Component<Props> {
  render() {
    return (
      <li>
        {this.props.errored ? (
          <div className="follow-list__error">No stop data available</div>
        ) : (
          <>
            <ul className="follow-list">
              {this.props.arrivals.map((arrival, index) => (
                <FollowListItem arrival={arrival} key={index} />
              ))}
            </ul>
          </>
        )}
      </li>
    );
  }
}

export default FollowList;
