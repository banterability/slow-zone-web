// @flow
import React from "react";

import LoadingBar from "../../Components/LoadingBar";
import {pushStation} from "../../store/RecentStations";
import {StationRequest} from "../../requests";
import Station from "./Station";

import type {Match as MatchType} from "react-router-dom";
import type {Station as StationType, Arrival as ArrivalType} from "../../types";

type Props = {match: MatchType};

type State = {
  arrivals: Array<ArrivalType>,
  loading: boolean,
  station: Object
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
          const stationData = {
            lines: station.lines,
            title: station.name,
            pathname: window.location.pathname
          };
          pushStation(station.id, stationData);
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
