// @flow
import React from "react";

import {StationRequest} from "../requests";
import {pushStation} from "../store/RecentStations";

import type {Match as MatchType} from "react-router-dom";

import type {Station as StationType, Arrival as ArrivalType} from "../types";

import LoadingBar from "../Components/LoadingBar";
import Station from "./Station";

type Props = {match: MatchType};
type State = {
  arrivals: Array<ArrivalType>,
  loading: boolean,
  station: StationType
};

class StationFetch extends React.Component<Props, State> {
  state = {
    arrivals: [],
    loading: true,
    station: {}
  };

  fetchStation = (): void => {
    const stationId = this.props.match.params.stationId;

    fetch(
      new StationRequest({
        url: `/${stationId}`
      })
    )
      .then(res => res.json())
      .then(
        ({
          station,
          arrivals
        }: {
          station: StationType,
          arrivals: Array<ArrivalType>
        }) => {
          pushStation(station.id, {
            lines: station.lines,
            title: station.name,
            pathname: window.location.pathname
          });
          this.setState({station, arrivals, loading: false});
        }
      );
  };

  componentDidMount() {
    this.fetchStation();
  }

  render() {
    const {station, arrivals} = this.state;
    return this.state.loading ? (
      <LoadingBar />
    ) : (
      <Station station={station} arrivals={arrivals} />
    );
  }
}

export default StationFetch;
