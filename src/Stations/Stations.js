// @flow
import React from "react";
import {Route, type Match as MatchType} from "react-router-dom";

import StationFetch from "./Station/StationFetch";
import StationListFetch from "./StationList/StationListFetch";

type Props = {match: MatchType};

const Stations = ({match}: Props) => (
  <>
    <Route path={match.url} exact component={StationListFetch} />
    <Route path={`${match.url}/:stationId`} component={StationFetch} />
  </>
);

export default Stations;
