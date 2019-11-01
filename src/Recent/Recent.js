// @flow
import React from "react";
import {Link} from "react-router-dom";

import EmptyState from "./EmptyState";
import StationListItem from "../Stations/StationList/StationListItem";
import {getRecentStations} from "../store/RecentStations";
import type {RecentStation} from "../types";

import "../css/StationList.scss";
import "../css/Page.scss";

const Recent = () => {
  const stations = getRecentStations();

  return (
    <>
      <div className="page__header">
        <h3>Recent Stations</h3>
      </div>
      {stations.length ? (
        <ul className="station-list" elementtiming="station-list">
          {getRecentStations().map(
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

export default Recent;
