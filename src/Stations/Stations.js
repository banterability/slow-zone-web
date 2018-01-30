// @flow
import React from "react";
import {Route} from "react-router-dom";
import type {Match as MatchType} from "react-router-dom";

import Station from "./Station";
import StationListFetch from "./StationListFetch";

class Stations extends React.Component<{match: MatchType}> {
  render() {
    const {match} = this.props;

    return (
      <div>
        <h2>Stations</h2>
        <Route path={match.url} exact component={StationListFetch} />
        <Route path={`${match.url}/:stationId`} component={Station} />
      </div>
    );
  }
}

export default Stations;
