import React from "react";

import StaticMap from "../../Components/StaticMap";

const StationHeader = ({name, latitude, longitude}) => (
  <>
    <h2>{name}</h2>
    <StaticMap
      latitude={latitude}
      longitude={longitude}
      width={640}
      height={150}
    />
  </>
);

export default StationHeader;
