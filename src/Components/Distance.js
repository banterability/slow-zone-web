// @flow

import React from "react";

import {Distance as DistanceType} from "../types";

class Distance extends React.Component<DistanceType> {
  render() {
    const {feet, miles} = this.props;
    if (miles > 0.25) {
      return <span>{`${miles} mi`}</span>;
    } else {
      return <span>{`${feet} feet`}</span>;
    }
  }
}

export default Distance;
