// @flow
import React from "react";

import {StationRequest} from "../requests";
import {pushStation} from "../store/RecentStations";

import ArrivalList from "./ArrivalList/ArrivalList";
import Lines from "./Lines";

import type {Match as MatchType} from "react-router";
import type {Station as StationType, Arrival as ArrivalType} from "../types";

type Props = {match: MatchType};
type State = {
  arrivals: Array<ArrivalType>,
  loading: boolean,
  station: StationType
};

class Station extends React.Component<Props, State> {
  state = {
    arrivals: [],
    loading: true,
    station: {}
  };

  fetchStation = () =>
    fetch(
      new StationRequest({
        url: `/${this.props.match.params.stationId}`
      })
    )
      .then(res => res.json())
      .then(({station, arrivals}) => {
        pushStation(station.id, {
          lines: station.lines,
          title: station.name,
          pathname: window.location.pathname
        });
        this.setState({station, arrivals, loading: false});
      });

  componentDidMount() {
    this.fetchStation();
  }

  _renderStation = () => {
    const {station: {name, lines}, arrivals} = this.state;
    return (
      <div>
        <h3>{name}</h3>
        <Lines lines={lines} />
        <ArrivalList arrivals={arrivals} />
      </div>
    );
  };

  render() {
    return this.state.loading ? <p>Loading</p> : this._renderStation();
  }
}

export default Station;
