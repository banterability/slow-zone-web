// @flow
import React, {Fragment} from "react";
import {Route} from "react-router-dom";

import StationFetch from "./Station/StationFetch";
import StationListFetch from "./StationList/StationListFetch";

import type {Match as MatchType} from "react-router-dom";

type Props = {match: MatchType};

const Stations = ({match}: Props) => (
  <Fragment>
    <h2>Stations</h2>
    <Route path={match.url} exact component={StationListFetch} />
    <Route path={`${match.url}/:stationId`} component={StationFetch} />
  </Fragment>
);

export default Stations;
