// @flow
import React, {Fragment} from "react";
import LoadingBar from "../../Components/LoadingBar";
import ArrivalList from "../ArrivalList/ArrivalList";
import Lines from "../Lines";

import type {Station as StationType, Arrival as ArrivalType} from "../../types";

type Props = {
  arrivals: Array<ArrivalType>,
  onRefresh(): Promise<any>,
  station: StationType
};

class Station extends React.Component<Props> {
  render() {
    const {
      station: {name, lines},
      arrivals,
      loading
    } = this.props;
    return (
      <Fragment>
        <h3>{name}</h3>
        <Lines lines={lines} />


          <ArrivalList arrivals={arrivals} />

      </Fragment>
    );
  }
}

export default Station;
