import React from "react";

import Filter from "./Filter";
import {lines as ALL_LINES} from "../constants";
import "./LineFilter.css";

class LineFilter extends React.Component {
  static defaultProps = {
    lines: ALL_LINES
  };

  render() {
    return (
      <Filter
        description="Line"
        options={this.props.lines}
        onFilter={this.props.onFilter}
        onReset={this.props.onReset}
      />
    );
  }
}
export default LineFilter;
