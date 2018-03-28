// @flow
import React from "react";
import PropTypes from "prop-types";

import {StationRequest} from "../requests";
import {pushStation} from "../store/RecentStations";

import ArrivalList from "./ArrivalList";
import Lines from "./Lines";

class Station extends React.Component {
  state = {
    arrivals: [],
    loading: true,
    station: {}
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        stationId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
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
