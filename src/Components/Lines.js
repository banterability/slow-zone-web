// @flow
import React from "react";

import type {Line as LineType} from "../types";

import "../css/Lines.scss";

type Props = {
  lines: Array<LineType>
};

const Lines = ({lines}: Props) => (
  <div className="lines">
    {lines.map((line, index) => (
      <div className={`line cta-${line}`} key={line} />
    ))}
  </div>
);

export default Lines;
