import React from "react";
import {Link} from "react-router-dom";

import Line from "./Line";

class StationListItem extends React.Component {
  render() {
    const {id, name, lines, url} = this.props;

    return (
      <Link to={url ? url : `/stations/${id}`}>
        <p>{name}</p>
        <div>
          {lines.map((line, index) => <Line key={index} line={line} />)}
        </div>
      </Link>
    );
  }
}

export default StationListItem;
