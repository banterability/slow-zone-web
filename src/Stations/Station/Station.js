// @flow
import React from "react";

import ArrivalList from "../ArrivalList/ArrivalList";
import LoadingBar from "../../Components/LoadingBar";
import StationHeader from "./StationHeader";
import type {Station as StationType, Arrival as ArrivalType} from "../../types";

type Props = {
  arrivals: Array<ArrivalType>,
  onRefresh(): Promise<any>,
  station: StationType
};

class Station extends React.Component<Props> {
  render() {
    const {
      station: {
        name,
        location: {latitude, longitude}
      },
      arrivals
    } = this.props;

    return (
      <>
        <StationHeader name={name} latitude={latitude} longitude={longitude} />
        <ArrivalList arrivals={arrivals} />
      </>
    );
  }
}

export default Station;
