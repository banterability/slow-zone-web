// @flow
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import {setDocumentTitle} from "../lib/document";
import StationListItem from "../Components/StationListItem";
import {getFavoriteStations} from "../store/FavoriteStations";
import type {RecentStation} from "../types";
import EmptyState from "./EmptyState";

import "../css/StationList.scss";

const Favorites = () => {
  const stations = getFavoriteStations();

  useEffect(() => {
    setDocumentTitle("Favorite Stations");
  });

  return (
    <>
      <div className="page__header">
        <h3>Favorite Stations</h3>
      </div>
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

      <div className="page__footer">
        <Link to="/stations">View All Stations</Link>
      </div>
    </>
  );
};

export default Favorites;
