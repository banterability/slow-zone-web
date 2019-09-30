import React from "react";

import {googleStaticMapsKey} from "../config";

import "../css/StaticMap.css";

const BASE_URL = "https://maps.googleapis.com/maps/api/staticmap";

const getParams = props => {
  const {latitude, longitude, width, height, ...passthrough} = props;
  return Object.entries({
    ...passthrough,
    center: `${latitude + 0.0005},${longitude}`,
    size: `${width}x${height}`
  })
    .reduce((memo, [key, value]) => {
      memo.push(`${key}=${value}`);
      return memo;
    }, [])
    .join("&");
};

const buildUrl = props => {
  return `${BASE_URL}?${getParams(props)}`;
};

const StaticMap = props => (
  <div
    className="static-map"
    style={{
      backgroundImage: `url(${buildUrl(props)})`
    }}
  />
);

StaticMap.defaultProps = {
  key: googleStaticMapsKey,
  scale: 2,
  zoom: 16
};

export default StaticMap;
