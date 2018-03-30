// @flow
import React from "react";
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
          {this.props.arrivals.map(station => (
            <li>{`${station.prediction.arrivalMinutes} – ${
              station.station.name
            }`}</li>
          ))}
        </ul>
      </li>
    );
  }
}

export default FollowList;
