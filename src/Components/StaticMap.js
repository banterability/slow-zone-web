import React from "react";

import {googleStaticMapsKey} from "../config";

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
  <img
    src={buildUrl(props)}
    width={props.width}
    height={props.height}
    alt={`Map of ${props.latitude}, ${props.longitude}`}
  />
);

StaticMap.defaultProps = {
  key: googleStaticMapsKey,
  scale: 2,
  zoom: 16
};

export default StaticMap;
