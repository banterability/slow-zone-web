import React from "react";
import {Route} from "react-router-dom";

import Station from "./Station";
import StationList from "./StationList";

class Stations extends React.Component {
  render() {
    const {match} = this.props;

    return (
      <div>
        <h2>Stations</h2>
        <Route path={match.url} exact component={StationList} />
        <Route path={`${match.url}/:stationId`} component={Station} />
      </div>
    );
  }
}

export default Stations;
