// @flow
import React, {Fragment} from "react";
import PullToRefresh from "react-pull-to-refresh";
import ArrivalList from "../ArrivalList/ArrivalList";
import Lines from "../Lines";

import type {Station as StationType, Arrival as ArrivalType} from "../../types";

type Props = {
  arrivals: Array<ArrivalType>,
  onRefresh(): void,
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

        <PullToRefresh onRefresh={this.props.onRefresh} loading={loading}>
          <ArrivalList arrivals={arrivals} />
        </PullToRefresh>
      </Fragment>
    );
  }
}

export default Station;
