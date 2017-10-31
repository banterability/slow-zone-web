// @flow
import React from "react";

import "./Lines.css";

type Props = {
  lines: Array<number>
};

const Lines = (props: Props) => (
  <div className="lines">
    {props.lines.map((line, index) => (
      <div className={`line cta-${line}`} key={line} />
    ))}
  </div>
);

export default Lines;
