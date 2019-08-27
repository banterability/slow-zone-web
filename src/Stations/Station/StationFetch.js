// @flow
import React from "react";
import type {Match as MatchType} from "react-router-dom";

import LoadingBar from "../../Components/LoadingBar";
import {pushStation} from "../../store/RecentStations";
import {StationRequest} from "../../requests";
import Station from "./Station";
import type {Station as StationType} from "../../types";

type Props = {match: MatchType};

type State = {
  loading: boolean,
  station: ?StationType
};

class StationFetch extends React.Component<Props, State> {
  state = {
    loading: false,
    station: null
  };

  fetchStation = (): Promise<any> => {
    this.setState({loading: true});

    const stationId = this.props.match.params.stationId;

    return fetch(new StationRequest({stationId}))
      .then(res => res.json())
      .then(({station}: {station: StationType}) => {
        const stationData = {
          lines: station.lines,
          title: station.name,
          pathname: window.location.pathname
        };
        pushStation(station.id, stationData);
        this.setState({station, loading: false});
      });
  };

  componentDidMount() {
    this.fetchStation();
  }

  render() {
    const {station, loading} = this.state;

    if (loading) {
      return <LoadingBar />;
    } else if (station) {
      return <Station station={station} loading={loading} />;
    } else {
      return null;
    }
  }
}

export default StationFetch;
