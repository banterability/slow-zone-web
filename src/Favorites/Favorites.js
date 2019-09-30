// @flow
import React from "react";
import {Link} from "react-router-dom";

import StationListItem from "../Stations/StationList/StationListItem";
import {getFavoriteStations} from "../store/FavoriteStations";
import type {RecentStation} from "../types";
import EmptyState from "./EmptyState";

import "../css/StationList.scss";

const Favorites = () => {
  const stations = getFavoriteStations();
  return (
    <>
      <h3>Favorite Stations</h3>
      {stations.length ? (
        <ul className="station-list" elementtiming="station-list">
          {stations.map(
            ({pathname, title, lines}: RecentStation, index: number) => (
              <li key={index}>
                <StationListItem name={title} lines={lines} url={pathname} />
              </li>
            )
          )}
        </ul>
      ) : (
        <EmptyState />
      )}

      <Link to="/stations">View All Stations</Link>
    </>
  );
};

export default Favorites;
