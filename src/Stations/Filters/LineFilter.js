//@flow
import React from "react";

import Filter from "./Filter";
import {lines as ALL_LINES} from "../constants";
import "./LineFilter.css";

type Props = {
  description: string,
  lines: Array<string>,
  onFilter: Function,
  onReset: Function
};

class LineFilter extends React.Component<Props> {
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
