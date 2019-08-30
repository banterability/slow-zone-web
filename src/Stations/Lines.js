// @flow
import React from "react";

import type {Line as LineType} from "../types";

import "./Lines.scss";

type Props = {
  lines: Array<LineType>
};

const Lines = (props: Props) => (
  <div className="lines">
    {props.lines.map((line, index) => (
      <div className={`line cta-${line}`} key={line} />
    ))}
  </div>
);

export default Lines;
