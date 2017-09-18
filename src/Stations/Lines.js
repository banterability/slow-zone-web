import React from "react";

import "./Lines.css";

const Lines = props => (
  <div className="lines">
    {props.lines.map((line, index) => (
      <div className={`line cta-${line}`} key={line} />
    ))}
  </div>
);

export default Lines;
