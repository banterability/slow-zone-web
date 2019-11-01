// @flow
import React from "react";

import ArrivalListFetch from "../ArrivalList/ArrivalListFetch";
import {setDocumentTitle} from "../../lib/document";
import StationHeader from "./StationHeader";
import type {Station as StationType} from "../../types";
import {
  isFavorite,
  addFavoriteStation,
  removeFavoriteStation
} from "../../store/FavoriteStations";

type Props = {
  loading: boolean,
  station: StationType
};

type State = {
  isFavorite: boolean
};

class Station extends React.Component<Props, State> {
  state = {
    isFavorite: isFavorite(this.props.station.id)
  };

  toggleFavorite = () => {
    const {
      station: {id, name, lines}
    } = this.props;
    const {isFavorite} = this.state;

    if (isFavorite) {
      removeFavoriteStation(id);
    } else {
      addFavoriteStation(id, {
        lines,
        title: name,
        pathname: window.location.pathname
      });
    }
    this.setState({
      isFavorite: !isFavorite
    });
  };

  render() {
    const {
      station: {
        id,
        name,
        description,
        location: {latitude, longitude},
        lines
      }
    } = this.props;
    const {isFavorite} = this.state;
    setDocumentTitle(`${isFavorite ? "⭐️" : ""} ${description}`);

    return (
      <>
        <StationHeader
          title={name}
          latitude={latitude}
          longitude={longitude}
          lines={lines}
          isFavorite={isFavorite}
          onToggleFavorite={this.toggleFavorite}
        />
        <ArrivalListFetch stationId={id} />
      </>
    );
  }
}

export default Station;
