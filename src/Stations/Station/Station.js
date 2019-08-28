// @flow
import React from "react";

import ArrivalListFetch from "../ArrivalList/ArrivalListFetch";
import StationHeader from "./StationHeader";
import type {Station as StationType} from "../../types";

type Props = {
  loading: boolean,
  station: StationType
};

class Station extends React.Component<Props> {
  render() {
    const {
      station: {
        id,
        name,
        location: {latitude, longitude},
        lines
      }
    } = this.props;

    return (
      <>
        <StationHeader
          name={name}
          latitude={latitude}
          longitude={longitude}
          lines={lines}
        />
        <ArrivalListFetch stationId={id} />
      </>
    );
  }
}

export default Station;
