import React from "react";
import PropTypes from "prop-types";

import {StationRequest} from "../requests";

import ArrivalList from "./ArrivalList";
import Line from "./Line";

class Station extends React.Component {
  state = {
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
      .then(json => json.data)
      .then(station => {
        this.setState({station, loading: false});
      });

  componentDidMount() {
    this.fetchStation();
  }

  _renderStation = () => {
    const {station: {name, lines, arrivals}} = this.state;
    return (
      <div>
        <h3>{name}</h3>
        <div>
          {lines.map((line, index) => <Line key={index} line={line} />)}
        </div>
        <ArrivalList arrivals={arrivals} />
      </div>
    );
  };

  render() {
    return this.state.loading ? <p>Loading</p> : this._renderStation();
  }
}

export default Station;
