// @flow
import React from "react";

import type {Distance as DistanceType} from "../types";

class Distance extends React.Component<DistanceType> {
  render() {
    const {feet, miles} = this.props;
    const value =
      miles > 0.25 ? `${miles.toFixed(1)} mi` : ` ${feet.toFixed(0)} feet`;

    return <span className="station-list__item__distance">{value}</span>;
  }
}

export default Distance;
