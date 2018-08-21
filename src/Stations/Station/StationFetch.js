// @flow
import React, {Fragment} from "react";

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
  station: ?StationType
};

class StationFetch extends React.Component<Props, State> {
  state = {
    arrivals: [],
    loading: true,
    station: null
  };

  fetchStation = (): Promise<any> => {
    const stationId = this.props.match.params.stationId;

    return fetch(
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

  refresh = (promise: Promise<any>) => {
    this.fetchStation().then(promise);
  };

  render() {
    const {station, arrivals, loading} = this.state;

    if (loading) {
      return <LoadingBar />;
    }

    return (
      <Fragment>
        {station && (
          <Station
            station={station}
            arrivals={arrivals}
            loading={loading}
            onRefresh={this.refresh}
          />
        )}
      </Fragment>
    );
  }
}

export default StationFetch;
