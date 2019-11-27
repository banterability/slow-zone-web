// @flow
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import EmptyState from "./EmptyState";
import {setDocumentTitle} from "../lib/document";
import StationListItem from "../Components/StationListItem";
import {getRecentStations} from "../store/RecentStations";
import type {RecentStation} from "../types";

import "../css/StationList.scss";
import "../css/Page.scss";

const Recent = () => {
  const stations = getRecentStations();

  useEffect(() => {
    setDocumentTitle("Recent Stations");
  });

  return (
    <>
      <div className="page__header">
        <h3>Recent Stations</h3>
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

export default Recent;
