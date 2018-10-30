// @flow
import React, {Fragment} from "react";
import ArrivalList from "../ArrivalList/ArrivalList";

import type {Station as StationType, Arrival as ArrivalType} from "../../types";

type Props = {
  arrivals: Array<ArrivalType>,
  onRefresh(): Promise<any>,
  station: StationType
};

class Station extends React.Component<Props> {
  render() {
    const {
      station: {name},
      arrivals
    } = this.props;

    return (
      <Fragment>
        <h2>{name}</h2>
        <ArrivalList arrivals={arrivals} />
      </Fragment>
    );
  }
}

export default Station;
