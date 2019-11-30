import React from "react";

import {buildQueryString} from "../lib/url";

import "../css/StaticMap.css";

const BASE_URL = "https://maps.googleapis.com/maps/api/staticmap";
const LATITUDE_OFFSET = 0.0005;

const generateMapUrl = ({
  height,
  latitude,
  longitude,
  width,
  ...passthrough
}) => {
  return `${BASE_URL}${buildQueryString({
    ...passthrough,
    center: `${latitude + LATITUDE_OFFSET},${longitude}`,
    size: `${width}x${height}`
  })}`;
};

const StaticMap = props => (
  <div
    className="static-map"
    style={{backgroundImage: `url(${generateMapUrl(props)})`}}
  />
);

StaticMap.defaultProps = {
  key: process.env.REACT_APP_GOOGLE_STATIC_MAPS_KEY,
  scale: 2,
  zoom: 16
};

export default StaticMap;
