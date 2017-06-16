import React from "react";

import Line from "./Line";

class Station extends React.Component {
  render() {
    const {name, lines} = this.props;

    return (
      <div>
        <p>{name}</p>
        <div>
          {lines.map((line, index) => <Line key={index} line={line} />)}
        </div>
      </div>
    );
  }
}

export default Station;
