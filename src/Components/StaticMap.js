// @flow
import React from "react";

import {buildQueryString} from "../lib/url";

import "../css/StaticMap.css";

const API_KEY = process.env.REACT_APP_GOOGLE_STATIC_MAPS_KEY;
if (!API_KEY) throw new Error("Missing GOOGLE_STATIC_MAPS_KEY");

const BASE_URL = "https://maps.googleapis.com/maps/api/staticmap";
const LATITUDE_OFFSET = 0.0005;

type Props = {
  height: number,
  key: string,
  latitude: number,
  longitude: number,
  scale: number,
  width: number,
  zoom: number
};

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

const StaticMap = (props: Props) => (
  <div
    className="static-map"
    style={{backgroundImage: `url(${generateMapUrl(props)})`}}
  />
);

StaticMap.defaultProps = {
  key: API_KEY,
  scale: 2,
  zoom: 16
};

export default StaticMap;
