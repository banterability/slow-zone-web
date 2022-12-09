// @flow
import React from "react";
import classnames from "classnames";

import "../../css/Arrow.scss";

type Props = {
  active: boolean;
  onClick?: () => void;
};

const Arrow = ({ active, onClick }: Props) => (
  <svg
    className={classnames("icon--arrow", { "icon--arrow--active": active })}
    width="20"
    height="20"
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fillRule="evenodd">
      <path
        d="M78.2856268,21.7443951 C56.2163108,46.9837884 43.411653,59.603485 39.8716534,59.603485 C34.561654,59.603485 3.06334639,24.0262155 1.45767994,21.7443951 C0.387235645,20.2231816 4.31169234,20.2231816 13.23105,21.7443951 L39.8716534,48.0001793 L66.5122567,21.7443951 L78.2856268,21.7443951 Z"
        fill="#CCCCCC"
      ></path>
    </g>
  </svg>
);

export default Arrow;
